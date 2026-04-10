import axios, { AxiosError } from 'axios'
import * as cheerio from 'cheerio'
import validator from 'validator'
import type {
	ImageData,
	LinkData,
	Metadata,
	OgTags,
	ResponseHeaders,
	ScriptData,
	SecurityHeaders,
	StructuredData,
	StylesheetData,
	TwitterTags,
} from '@/app/types'

export async function GET(request: Request): Promise<Response> {
	const startedAt = Date.now()
	const { searchParams } = new URL(request.url)
	const url = searchParams.get('url')

	if (!url) {
		return Response.json(
			{ error: 'URL parameter is required' },
			{ status: 400 }
		)
	}

	let normalizedUrl = url
	if (!url.startsWith('http://') && !url.startsWith('https://')) {
		normalizedUrl = `https://${url}`
	}

	if (!validator.isURL(normalizedUrl, { require_protocol: true })) {
		return Response.json({ error: 'Invalid URL format' }, { status: 400 })
	}

	try {
		const response = await axios.get<string>(normalizedUrl, {
			timeout: 15000,
			maxRedirects: 5,
			headers: {
				'User-Agent': 'MetaPeek/1.0 (Website Metadata Preview Tool)',
				Accept:
					'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
				'Accept-Language': 'en-US,en;q=0.5',
				'Accept-Encoding': 'gzip, deflate',
				Connection: 'keep-alive',
			},
		})

		const html = response.data
		const $ = cheerio.load(html)

		const title =
			$('title').text().trim() ||
			$('meta[property="og:title"]').attr('content') ||
			$('meta[name="twitter:title"]').attr('content') ||
			'No title found'

		const description =
			$('meta[name="description"]').attr('content') ||
			$('meta[property="og:description"]').attr('content') ||
			$('meta[name="twitter:description"]').attr('content') ||
			'No description found'

		const keywords = $('meta[name="keywords"]').attr('content') || ''
		const author = $('meta[name="author"]').attr('content') || ''
		const robots = $('meta[name="robots"]').attr('content') || ''
		const viewport = $('meta[name="viewport"]').attr('content') || ''
		const charset =
			$('meta[charset]').attr('charset') ||
			$('meta[http-equiv="Content-Type"]').attr('content') ||
			''

		const language =
			$('html').attr('lang') ||
			$('meta[http-equiv="content-language"]').attr('content') ||
			''

		const ogTags: OgTags = {}
		$('meta[property^="og:"]').each((_i, element) => {
			const property = $(element).attr('property')
			const content = $(element).attr('content')
			if (property && content) {
				ogTags[property] = content
			}
		})

		const twitterTags: TwitterTags = {}
		$('meta[name^="twitter:"]').each((_i, element) => {
			const name = $(element).attr('name')
			const content = $(element).attr('content')
			if (name && content) {
				twitterTags[name] = content
			}
		})

		const structuredData: StructuredData[] = []
		$('script[type="application/ld+json"]').each((_i, element) => {
			try {
				const raw = $(element).html()
				if (raw) {
					structuredData.push(JSON.parse(raw))
				}
			} catch (e) {
				console.error(
					'Error parsing structured data:',
					e instanceof Error ? e.message : String(e)
				)
			}
		})

		const images: ImageData[] = []
		$('img').each((_i, element) => {
			const src = $(element).attr('src')
			const alt = $(element).attr('alt') || ''
			const imgTitle = $(element).attr('title') || ''
			const width = $(element).attr('width') || ''
			const height = $(element).attr('height') || ''

			if (src) {
				const absoluteSrc = src.startsWith('http')
					? src
					: new URL(src, normalizedUrl).href
				images.push({ src: absoluteSrc, alt, title: imgTitle, width, height })
			}
		})

		const links: {
			internal: LinkData[]
			external: LinkData[]
			stylesheets: StylesheetData[]
			scripts: ScriptData[]
		} = {
			internal: [],
			external: [],
			stylesheets: [],
			scripts: [],
		}

		$('a[href]').each((_i, element) => {
			const href = $(element).attr('href')
			const text = $(element).text().trim()
			const linkTitle = $(element).attr('title') || ''

			if (href) {
				try {
					const linkUrl = new URL(href, normalizedUrl)
					const isInternal =
						linkUrl.hostname === new URL(normalizedUrl).hostname

					const linkData: LinkData = {
						href: linkUrl.href,
						text,
						title: linkTitle,
					}
					if (isInternal) {
						links.internal.push(linkData)
					} else {
						links.external.push(linkData)
					}
				} catch (e) {
					console.error(
						'Error parsing link URL:',
						e instanceof Error ? e.message : String(e)
					)
				}
			}
		})

		$('link[rel="stylesheet"]').each((_i, element) => {
			const href = $(element).attr('href')
			if (href) {
				const absoluteHref = href.startsWith('http')
					? href
					: new URL(href, normalizedUrl).href
				links.stylesheets.push({ href: absoluteHref })
			}
		})

		$('script[src]').each((_i, element) => {
			const src = $(element).attr('src')
			if (src) {
				const absoluteSrc = src.startsWith('http')
					? src
					: new URL(src, normalizedUrl).href
				links.scripts.push({ src: absoluteSrc })
			}
		})

		const headings: Metadata['headings'] = []
		$('h1, h2, h3, h4, h5, h6').each((_i, element) => {
			const level =
				element.tagName.toLowerCase() as Metadata['headings'][number]['level']
			const text = $(element).text().trim()
			const id = $(element).attr('id') || ''
			if (text) {
				headings.push({ level, text, id })
			}
		})

		const performanceMetrics = {
			htmlSize: html.length,
			totalImages: images.length,
			totalLinks: links.internal.length + links.external.length,
			totalStylesheets: links.stylesheets.length,
			totalScripts: links.scripts.length,
			hasStructuredData: structuredData.length > 0,
			hasOpenGraph: Object.keys(ogTags).length > 0,
			hasTwitterCards: Object.keys(twitterTags).length > 0,
		}

		const seoAnalysis = {
			hasTitle: !!title && title !== 'No title found',
			titleLength: title.length,
			hasDescription: !!description && description !== 'No description found',
			descriptionLength: description.length,
			hasKeywords: !!keywords,
			hasH1: $('h1').length > 0,
			h1Count: $('h1').length,
			hasAltTags: images.filter((img) => img.alt).length,
			missingAltTags: images.filter((img) => !img.alt).length,
			hasLang: !!language,
			hasViewport: !!viewport,
			hasRobots: !!robots,
		}

		const securityHeaders: SecurityHeaders = {
			'content-security-policy': response.headers['content-security-policy'],
			'x-frame-options': response.headers['x-frame-options'],
			'x-content-type-options': response.headers['x-content-type-options'],
			'strict-transport-security':
				response.headers['strict-transport-security'],
			'referrer-policy': response.headers['referrer-policy'],
			'permissions-policy': response.headers['permissions-policy'],
		}

		for (const key of Object.keys(
			securityHeaders
		) as (keyof SecurityHeaders)[]) {
			if (securityHeaders[key] === undefined) {
				delete securityHeaders[key]
			}
		}

		let favicon =
			$('link[rel="icon"]').attr('href') ||
			$('link[rel="shortcut icon"]').attr('href') ||
			$('link[rel="apple-touch-icon"]').attr('href') ||
			'/favicon.ico'

		if (favicon && !favicon.startsWith('http')) {
			const baseUrl = new URL(normalizedUrl)
			favicon = new URL(favicon, baseUrl.origin).href
		}

		let ogImage: string | undefined =
			ogTags['og:image'] ||
			twitterTags['twitter:image'] ||
			twitterTags['twitter:image:src']

		if (ogImage && !ogImage.startsWith('http')) {
			const baseUrl = new URL(normalizedUrl)
			ogImage = new URL(ogImage, baseUrl.origin).href
		}

		const responseHeaders: ResponseHeaders = {
			'content-type': response.headers['content-type'],
			'content-length': response.headers['content-length'],
			server: response.headers.server,
			'last-modified': response.headers['last-modified'],
			'cache-control': response.headers['cache-control'],
			etag: response.headers.etag,
			expires: response.headers.expires,
		}

		for (const key of Object.keys(
			responseHeaders
		) as (keyof ResponseHeaders)[]) {
			if (responseHeaders[key] === undefined) {
				delete responseHeaders[key]
			}
		}

		// `responseUrl` is set by axios at runtime on Node http responses but is not
		// exposed on the public AxiosResponse type. Fall back to the normalized URL.
		const finalUrl =
			(response.request as { res?: { responseUrl?: string } } | undefined)?.res
				?.responseUrl ?? normalizedUrl

		const metadata: Metadata = {
			url: finalUrl,
			title,
			description,
			keywords,
			author,
			language,
			charset,
			viewport,
			robots,
			ogImage,
			favicon,
			images: images.slice(0, 20),
			httpStatus: response.status,
			responseHeaders,
			securityHeaders,
			ogTags,
			twitterTags,
			headings: headings.slice(0, 50),
			links: {
				internal: links.internal.slice(0, 20),
				external: links.external.slice(0, 20),
				stylesheets: links.stylesheets.slice(0, 10),
				scripts: links.scripts.slice(0, 10),
			},
			structuredData,
			performanceMetrics,
			seoAnalysis,
			fetchedAt: new Date().toISOString(),
			processingTime: Date.now() - startedAt,
		}

		return Response.json(metadata)
	} catch (error) {
		console.error(
			'Error fetching metadata:',
			error instanceof Error ? error.message : String(error)
		)

		let errorMessage = 'Failed to fetch metadata'
		let statusCode = 500

		if (error instanceof AxiosError) {
			if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
				errorMessage = 'Website not found or unreachable'
				statusCode = 404
			} else if (error.response) {
				errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`
				statusCode = error.response.status
			} else if (error.code === 'ECONNABORTED') {
				errorMessage = 'Request timeout - website took too long to respond'
				statusCode = 408
			}
		}

		return Response.json(
			{
				error: errorMessage,
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: statusCode }
		)
	}
}
