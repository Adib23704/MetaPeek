import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'MetaPeek - Website Metadata Preview Tool',
	description:
		'Instantly preview website metadata, Open Graph images, and technical details. No signup required – just paste a URL and explore!',
	keywords:
		'metadata, open graph, SEO, website preview, meta tags, developer tools',
	authors: [{ name: 'MetaPeek' }],
	openGraph: {
		title: 'MetaPeek - Website Metadata Preview Tool',
		description:
			'Instantly preview website metadata, Open Graph images, and technical details.',
		type: 'website',
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MetaPeek - Website Metadata Preview Tool',
		description:
			'Instantly preview website metadata, Open Graph images, and technical details.',
	},
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
