'use client'
import { useState } from 'react'

export default function URLInput({ onSubmit, loading }) {
	const [url, setUrl] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault()
		setError('')

		if (!url.trim()) {
			setError('Please enter a URL')
			return
		}

		onSubmit(url.trim())
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e)
		}
	}

	return (
		<div className="mx-auto w-full max-w-xs px-4 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
			<form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
				<div className="relative">
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onKeyDown={handleKeyPress}
						placeholder="Enter website URL (e.g., https://example.com)"
						className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm transition-colors placeholder:text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none sm:px-4 sm:py-3 sm:text-base placeholder:sm:text-sm placeholder:md:text-base lg:text-lg ${
							error
								? 'border-red-300 focus:border-red-500'
								: 'border-gray-300 focus:border-blue-500'
						} ${loading ? 'opacity-75' : ''}`}
						disabled={loading}
						autoFocus
					/>
					{loading && (
						<div className="absolute top-1/2 right-2 -translate-y-1/2 sm:right-3">
							<div className="h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-blue-500 sm:h-6 sm:w-6"></div>
						</div>
					)}
				</div>

				{error && (
					<p className="px-1 text-xs text-red-500 sm:text-sm">{error}</p>
				)}

				<button
					type="submit"
					disabled={loading || !url.trim()}
					className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 sm:py-3 sm:text-base lg:text-lg ${
						!loading && url.trim()
							? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
							: 'cursor-not-allowed bg-gray-300 text-gray-500'
					}`}
				>
					{loading ? (
						<span className="flex items-center justify-center gap-2">
							<div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current"></div>
							Fetching...
						</span>
					) : (
						'Get Metadata'
					)}
				</button>
			</form>
		</div>
	)
}
