export interface OgTags {
	[key: string]: string
}

export interface TwitterTags {
	[key: string]: string
}

export interface ImageData {
	src: string
	alt: string
	title: string
	width: string
	height: string
}

export interface LinkData {
	href: string
	text: string
	title: string
}

export interface StylesheetData {
	href: string
}

export interface ScriptData {
	src: string
}

export interface Heading {
	level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	text: string
	id: string
}

export interface Links {
	internal: LinkData[]
	external: LinkData[]
	stylesheets: StylesheetData[]
	scripts: ScriptData[]
}

export interface PerformanceMetrics {
	htmlSize: number
	totalImages: number
	totalLinks: number
	totalStylesheets: number
	totalScripts: number
	hasStructuredData: boolean
	hasOpenGraph: boolean
	hasTwitterCards: boolean
}

export interface SeoAnalysis {
	hasTitle: boolean
	titleLength: number
	hasDescription: boolean
	descriptionLength: number
	hasKeywords: boolean
	hasH1: boolean
	h1Count: number
	hasAltTags: number
	missingAltTags: number
	hasLang: boolean
	hasViewport: boolean
	hasRobots: boolean
}

export interface ResponseHeaders {
	'content-type'?: string
	'content-length'?: string
	server?: string
	'last-modified'?: string
	'cache-control'?: string
	etag?: string
	expires?: string
}

export interface SecurityHeaders {
	'content-security-policy'?: string
	'x-frame-options'?: string
	'x-content-type-options'?: string
	'strict-transport-security'?: string
	'referrer-policy'?: string
	'permissions-policy'?: string
}

// JSON-LD structured data is genuinely arbitrary; `unknown` forces consumers to narrow.
export type StructuredData = unknown

export interface Metadata {
	url: string
	title: string
	description: string
	keywords: string
	author: string
	language: string
	charset: string
	viewport: string
	robots: string
	ogImage: string | undefined
	favicon: string
	images: ImageData[]
	httpStatus: number
	responseHeaders: ResponseHeaders
	securityHeaders: SecurityHeaders
	ogTags: OgTags
	twitterTags: TwitterTags
	headings: Heading[]
	links: Links
	structuredData: StructuredData[]
	performanceMetrics: PerformanceMetrics
	seoAnalysis: SeoAnalysis
	fetchedAt: string
	processingTime: number
}

export interface ApiError {
	error: string
	details?: string
}
