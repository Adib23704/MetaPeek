'use client'
import Image from 'next/image'
import { useState } from 'react'
import logo from '../../public/logo.png'
import ErrorMessage from './components/ErrorMessage'
import MetadataPreview from './components/MetadataPreview'
import URLInput from './components/URLInput'
import type { ApiError, Metadata } from './types'

export default function Home() {
	const [metadata, setMetadata] = useState<Metadata | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const handleFetchMetadata = async (url: string) => {
		setLoading(true)
		setError('')
		setMetadata(null)

		try {
			const response = await fetch(
				`/api/fetchMeta?url=${encodeURIComponent(url)}`
			)
			const data: Metadata | ApiError = await response.json()

			if (!response.ok) {
				const message =
					'error' in data ? data.error : 'Failed to fetch metadata'
				throw new Error(message)
			}

			setMetadata(data as Metadata)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error')
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

						<h1 className="font-bold text-3xl text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
							Meta<span className="text-blue-500">Peek</span>
						</h1>
					</div>

					<div className="mb-4 flex flex-wrap items-center justify-center gap-2 sm:mb-6 sm:gap-4">
						<span className="text-sm sm:text-xl lg:text-lg">
							⚡ Real-Time Fetch
						</span>
						<span className="text-gray-400 text-sm sm:inline lg:text-lg">
							•
						</span>
						<span className="text-sm sm:text-xl lg:text-lg">
							🔓 No Auth Required
						</span>
					</div>

					<p className="mx-auto max-w-xs px-2 text-base text-gray-600 leading-relaxed sm:max-w-2xl sm:px-0 sm:text-lg lg:max-w-4xl lg:text-xl">
						Instantly preview website metadata, Open Graph images, and technical
						details. No signup required – just paste a URL and explore!
					</p>
				</div>
				<URLInput onSubmit={handleFetchMetadata} loading={loading} />
				<ErrorMessage error={error} />
				<MetadataPreview metadata={metadata} />
				<footer className="fixed bottom-0 left-0 z-10 w-full border-gray-200 border-t bg-white py-4 text-center text-gray-500">
					<p>
						Built by{' '}
						<a
							href="https://adibdev.me"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold text-blue-500 hover:underline"
						>
							Adib
						</a>{' '}
						with 💖 |{' '}
						<a
							href="https://github.com/Adib23704/MetaPeek"
							target="_blank"
							rel="noopener noreferrer"
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
