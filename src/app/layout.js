import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'MetaPeek - Website Metadata Preview Tool',
	description:
		'Instantly preview website metadata, Open Graph images, and technical details. No signup required – just paste a URL and explore!',
	keywords:
		'metadata, open graph, SEO, website preview, meta tags, developer tools',
	authors: [{ name: 'Adib23704', url: 'https://adibdev.me' }],
	creator: 'Adib23704',
	publisher: 'MetaPeek',
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://metapeek.adibdev.me'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'MetaPeek - Website Metadata Preview Tool',
		description:
			'Instantly preview website metadata, Open Graph images, and technical details. No signup required – just paste a URL and explore!',
		url: 'https://metapeek.adibdev.me',
		siteName: 'MetaPeek',
		images: [
			{
				url: '/images/cover-image.jpg',
				width: 1200,
				height: 630,
				alt: 'MetaPeek - Website Metadata Preview Tool',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MetaPeek - Website Metadata Preview Tool',
		description:
			'Instantly preview website metadata, Open Graph images, and technical details. No signup required – just paste a URL and explore!',
		images: ['/images/cover-image.jpg'],
		creator: '@adib2374',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />

				<meta name="theme-color" content="#8b5cf6" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="MetaPeek" />

				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="shortcut icon" href="/favicon.ico" />

				<link
					rel="apple-touch-icon"
					sizes="57x57"
					href="/favicon/apple-icon-57x57.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/favicon/apple-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="72x72"
					href="/favicon/apple-icon-72x72.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/favicon/apple-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="114x114"
					href="/favicon/apple-icon-114x114.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/favicon/apple-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="144x144"
					href="/favicon/apple-icon-144x144.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/favicon/apple-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicon/apple-icon-180x180.png"
				/>

				<link
					rel="icon"
					type="image/png"
					sizes="192x192"
					href="/favicon/android-icon-192x192.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/favicon/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon/favicon-16x16.png"
				/>

				<link rel="manifest" href="/favicon/manifest.json" />

				<meta name="msapplication-TileColor" content="#8b5cf6" />
				<meta
					name="msapplication-TileImage"
					content="/favicon/ms-icon-144x144.png"
				/>
				<meta
					name="msapplication-config"
					content="/favicon/browserconfig.xml"
				/>

				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'WebApplication',
							name: 'MetaPeek',
							description:
								'Instantly preview website metadata, Open Graph images, and technical details. No signup required – just paste a URL and explore!',
							url: 'https://metapeek.adibdev.me',
							applicationCategory: 'MultimediaApplication',
							operatingSystem: 'Web Browser',
							offers: {
								'@type': 'Offer',
								price: '0',
								priceCurrency: 'USD',
							},
							creator: {
								'@type': 'Person',
								name: 'Adib',
								url: 'https://adibdev.me',
							},
							featureList: [
								'Instant metadata preview',
								'Open Graph image extraction',
								'Technical details display',
								'No signup required',
								'User-friendly interface',
								'Cross-platform compatibility',
								'Open-source codebase',
								'Developer tools',
							],
						}),
					}}
				/>
			</head>

			<body className={inter.className}>{children}</body>
		</html>
	)
}
