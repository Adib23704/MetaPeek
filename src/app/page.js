'use client'
import Image from 'next/image'
import { useState } from 'react'
import ErrorMessage from './components/ErrorMessage'
import MetadataPreview from './components/MetadataPreview'
import URLInput from './components/URLInput'

import logo from '../../public/logo.png'

export default function Home() {
	const [metadata, setMetadata] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleFetchMetadata = async (url) => {
		setLoading(true)
		setError('')
		setMetadata(null)

		try {
			const response = await fetch(
				`/api/fetchMeta?url=${encodeURIComponent(url)}`
			)
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch metadata')
			}

			setMetadata(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
			<div className="container mx-auto px-4 py-12">
				<div className="mb-8 text-center sm:mb-10 lg:mb-12">
					<div className="mb-4 flex flex-col items-center justify-center gap-3 sm:mb-6 sm:flex-row sm:gap-4">
						<Image
							src={logo}
							alt="MetaPeek Logo"
							width={64}
							height={64}
							className="sm:size-16 lg:size-20"
						/>

						<h1 className="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							Meta<span className="text-blue-500">Peek</span>
						</h1>
					</div>

					<div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:mb-6 sm:gap-4">
						<span className="text-sm sm:text-xl lg:text-lg">
							⚡ Real-Time Fetch
						</span>
						<span className="text-sm text-gray-400 sm:inline lg:text-lg">
							•
						</span>
						<span className="text-sm sm:text-xl lg:text-lg">
							🔓 No Auth Required
						</span>
					</div>

					{/* Description - Responsive text and spacing */}
					<p className="mx-auto max-w-xs px-2 text-base leading-relaxed text-gray-600 sm:max-w-2xl sm:px-0 sm:text-lg lg:max-w-4xl lg:text-xl">
						Instantly preview website metadata, Open Graph images, and technical
						details. No signup required – just paste a URL and explore!
					</p>
				</div>
				<URLInput onSubmit={handleFetchMetadata} loading={loading} />
				<ErrorMessage error={error} />
				<MetadataPreview metadata={metadata} />
				<footer className="fixed bottom-0 left-0 z-10 w-full border-t border-gray-200 bg-white py-4 text-center text-gray-500">
					<p>
						Built by{' '}
						<a
							href="https://adibdev.me"
							target="_blank"
							className="font-semibold text-blue-500 hover:underline"
						>
							Adib
						</a>{' '}
						with 💖 |{' '}
						<a
							href="https://github.com/Adib23704/MetaPeek"
							target="_blank"
							className="font-medium text-blue-500 hover:underline"
						>
							Github
						</a>
					</p>
				</footer>
			</div>
		</div>
	)
}
