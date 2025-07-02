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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
			<div className="container mx-auto px-4 py-12">
				<div className="mb-12 text-center">
					<div className="mb-4 flex items-center justify-center gap-4">
						<div className="flex-shrink-0">
							<Image
								src={logo}
								alt="MetaPeek Logo"
								width={64}
								height={64}
								className="mr-4"
							/>
						</div>

						<h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
							Meta<span className="text-blue-500">Peek</span>
						</h1>
					</div>

					<p className="mx-auto mb-4 max-w-2xl text-xl text-gray-600">
						Instantly preview website metadata, Open Graph images, and technical
						details. No signup required – just paste a URL and explore!
					</p>
					<div className="flex items-center justify-center gap-4 text-sm text-gray-500">
						<span>⚡ Real-Time Fetch</span>
						<span>•</span>
						<span>🔓 No Auth Required</span>
					</div>
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
