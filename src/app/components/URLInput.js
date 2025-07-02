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
		<div className="mx-auto w-full max-w-2xl">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="relative">
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="Enter website URL (e.g., https://example.com)"
						className={`input-field ${
							error
								? 'border-red-300 focus:border-red-500'
								: 'border-gray-300 focus:border-blue-500'
						} ${loading ? 'opacity-75' : ''}`}
						disabled={loading}
						autoFocus
					/>
					{loading && (
						<div className="absolute top-1/2 right-3 -translate-y-1/2">
							<div className="size-6 animate-spin rounded-full border-2 border-transparent border-t-blue-500"></div>
						</div>
					)}
				</div>

				{error && <p className="text-sm text-red-500">{error}</p>}

				<button
					type="submit"
					disabled={loading || !url.trim()}
					className={`w-full rounded-lg px-6 py-3 text-lg font-semibold transition-colors ${
						!loading && url.trim()
							? 'bg-blue-500 text-white hover:bg-blue-600'
							: 'cursor-not-allowed bg-gray-300 text-gray-500'
					}`}
				>
					{loading ? 'Fetching Metadata...' : 'Get Metadata'}
				</button>
			</form>
		</div>
	)
}
