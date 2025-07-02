'use client';
import { useState } from 'react';

export default function MetadataPreview({ metadata }) {
	const [showRawData, setShowRawData] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [faviconError, setFaviconError] = useState(false);

	if (!metadata) return null;

	return (
		<div className="mx-auto mt-8 w-full max-w-4xl space-y-6">
			<div className="card">
				<div className="mb-4 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						{metadata.favicon && !faviconError && (
							<img
								src={metadata.favicon}
								alt="Favicon"
								className="size-6"
								onError={() => setFaviconError(true)}
							/>
						)}
						<span className="text-sm break-all text-gray-600">
							{metadata.url}
						</span>
					</div>
					<span
						className={`rounded px-2 py-1 text-sm font-semibold ${
							metadata.httpStatus >= 200 && metadata.httpStatus < 300
								? 'bg-green-100 text-green-800'
								: metadata.httpStatus >= 300 && metadata.httpStatus < 400
									? 'bg-yellow-100 text-yellow-800'
									: 'bg-red-100 text-red-800'
						}`}
					>
						{metadata.httpStatus}
					</span>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="space-y-4 md:col-span-2">
						<h1 className="text-2xl leading-tight font-bold text-gray-900">
							{metadata.title}
						</h1>
						<p className="leading-relaxed text-gray-600">
							{metadata.description}
						</p>
					</div>

					<div className="flex justify-center">
						{metadata.ogImage && !imageError ? (
							<div className="relative w-full max-w-sm">
								<img
									src={metadata.ogImage}
									alt="Open Graph Image"
									className="h-auto w-full rounded-lg shadow-md"
									onError={() => setImageError(true)}
								/>
							</div>
						) : (
							<div className="flex h-48 w-full max-w-sm items-center justify-center rounded-lg bg-gray-100">
								<span className="text-gray-400">No preview image</span>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="rounded-lg bg-gray-50 p-6">
				<h3 className="mb-4 text-lg font-semibold text-gray-900">
					Technical Details
				</h3>

				<div className="mb-4">
					<h4 className="mb-2 font-medium text-gray-700">Response Headers</h4>
					<div className="space-y-1 rounded border bg-white p-3">
						{Object.entries(metadata.responseHeaders).map(([key, value]) => (
							<div key={key} className="flex text-sm">
								<span className="w-32 shrink-0 font-mono text-gray-600">
									{key}:
								</span>
								<span className="text-gray-800">{value}</span>
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">
						Fetched at: {new Date(metadata.fetchedAt).toLocaleString()}
					</span>
					<button
						onClick={() => setShowRawData(!showRawData)}
						className="btn-primary"
					>
						{showRawData ? 'Hide' : 'Show'} Raw JSON
					</button>
				</div>

				{showRawData && (
					<div className="mt-4">
						<pre className="scrollbar-hide overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
							{JSON.stringify(metadata, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
}
