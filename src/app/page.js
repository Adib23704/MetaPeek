'use client';
import { useState } from 'react';
import URLInput from '@/components/URLInput';
import MetadataPreview from '@/components/MetadataPreview';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
	const [metadata, setMetadata] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleFetchMetadata = async (url) => {
		setLoading(true);
		setError('');
		setMetadata(null);

		try {
			const response = await fetch(
				`/api/fetchMeta?url=${encodeURIComponent(url)}`
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Failed to fetch metadata');
			}

			setMetadata(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
			<div className="container mx-auto px-4 py-12">
				<div className="mb-12 text-center">
					<h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-6xl">
						Meta<span className="text-blue-500">Peek</span>
					</h1>
					<p className="mx-auto max-w-2xl text-xl text-gray-600">
						Instantly preview website metadata, Open Graph images, and technical
						details. No signup required – just paste a URL and explore!
					</p>
				</div>

				<URLInput onSubmit={handleFetchMetadata} loading={loading} />

				<ErrorMessage error={error} />

				<MetadataPreview metadata={metadata} />

				<footer className="mt-16 text-center text-gray-500">
					<p>Built with Next.js • Open source • No tracking • No database</p>
				</footer>
			</div>
		</div>
	);
}
