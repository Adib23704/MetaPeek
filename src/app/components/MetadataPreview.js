'use client'
import { useState } from 'react'

export default function MetadataPreview({ metadata }) {
	const [activeTab, setActiveTab] = useState('overview')
	const [showRawData, setShowRawData] = useState(false)
	const [imageError, setImageError] = useState(false)
	const [faviconError, setFaviconError] = useState(false)

	if (!metadata) return null

	const tabs = [
		{ id: 'overview', label: 'Overview', icon: '📋' },
		{ id: 'seo', label: 'SEO Analysis', icon: '🔍' },
		{ id: 'social', label: 'Social Media', icon: '📱' },
		{ id: 'technical', label: 'Technical', icon: '⚙️' },
		{ id: 'structure', label: 'Structure', icon: '🏗️' },
		{ id: 'security', label: 'Security', icon: '🔒' },
	]

	return (
		<div className="mx-auto mt-8 w-full max-w-6xl space-y-6">
			<div className="card">
				<div className="mb-4 flex items-start justify-between gap-4 sm:flex-row sm:items-center">
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
					<div className="flex items-center space-x-2">
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
						{metadata.language && (
							<span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
								{metadata.language}
							</span>
						)}
					</div>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="space-y-4 md:col-span-2">
						<h1 className="text-2xl leading-tight font-bold text-gray-900">
							{metadata.title}
						</h1>
						<p className="leading-relaxed text-gray-600">
							{metadata.description}
						</p>
						{metadata.keywords && (
							<div className="flex flex-wrap gap-2">
								{metadata.keywords
									.split(',')
									.slice(0, 20)
									.map((keyword, index) => (
										<span
											key={index}
											className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700"
										>
											{keyword.trim()}
										</span>
									))}
							</div>
						)}
					</div>

					<div className="flex items-center justify-center">
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

			<div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
				<div className="border-b border-gray-200">
					<nav className="flex space-x-4 overflow-x-auto px-4 sm:space-x-8 sm:px-6">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex-shrink-0 border-b-2 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
									activeTab === tab.id
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700'
								}`}
							>
								<span className="mr-2">{tab.icon}</span>
								{tab.label}
							</button>
						))}
					</nav>
				</div>

				<div className="p-4 sm:p-6">
					{activeTab === 'overview' && (
						<div className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Basic Information
									</h3>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium">Author:</span>{' '}
											{metadata.author || 'Not specified'}
										</div>
										<div>
											<span className="font-medium">Charset:</span>{' '}
											{metadata.charset || 'Not specified'}
										</div>
										<div>
											<span className="font-medium">Viewport:</span>{' '}
											{metadata.viewport || 'Not specified'}
										</div>
										<div>
											<span className="font-medium">Robots:</span>{' '}
											{metadata.robots || 'Not specified'}
										</div>
									</div>
								</div>
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Performance Metrics
									</h3>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium">HTML Size:</span>{' '}
											{(metadata.performanceMetrics.htmlSize / 1024).toFixed(2)}{' '}
											KB
										</div>
										<div>
											<span className="font-medium">Total Images:</span>{' '}
											{metadata.performanceMetrics.totalImages}
										</div>
										<div>
											<span className="font-medium">Total Links:</span>{' '}
											{metadata.performanceMetrics.totalLinks}
										</div>
										<div>
											<span className="font-medium">Stylesheets:</span>{' '}
											{metadata.performanceMetrics.totalStylesheets}
										</div>
										<div>
											<span className="font-medium">Scripts:</span>{' '}
											{metadata.performanceMetrics.totalScripts}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'seo' && (
						<div className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										SEO Checklist
									</h3>
									<div className="space-y-2">
										{[
											{
												label: 'Has Title Tag',
												value: metadata.seoAnalysis.hasTitle,
											},
											{
												label: 'Has Meta Description',
												value: metadata.seoAnalysis.hasDescription,
											},
											{
												label: 'Has H1 Tag',
												value: metadata.seoAnalysis.hasH1,
											},
											{
												label: 'Has Language Attribute',
												value: metadata.seoAnalysis.hasLang,
											},
											{
												label: 'Has Viewport Meta',
												value: metadata.seoAnalysis.hasViewport,
											},
											{
												label: 'Has Open Graph Tags',
												value: metadata.performanceMetrics.hasOpenGraph,
											},
										].map((item, index) => (
											<div key={index} className="flex items-center space-x-2">
												<span
													className={`h-4 w-4 rounded-full ${item.value ? 'bg-green-500' : 'bg-red-500'}`}
												></span>
												<span className="text-sm">{item.label}</span>
											</div>
										))}
									</div>
								</div>
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Content Analysis
									</h3>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium">Title Length:</span>{' '}
											{metadata.seoAnalysis.titleLength} chars
										</div>
										<div>
											<span className="font-medium">Description Length:</span>{' '}
											{metadata.seoAnalysis.descriptionLength} chars
										</div>
										<div>
											<span className="font-medium">H1 Count:</span>{' '}
											{metadata.seoAnalysis.h1Count}
										</div>
										<div>
											<span className="font-medium">Images with Alt:</span>{' '}
											{metadata.seoAnalysis.hasAltTags}
										</div>
										<div>
											<span className="font-medium">Missing Alt Tags:</span>{' '}
											{metadata.seoAnalysis.missingAltTags}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'social' && (
						<div className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Open Graph Tags
									</h3>
									<div className="max-h-60 space-y-1 overflow-y-auto rounded bg-gray-50 p-3">
										{Object.keys(metadata.ogTags).length > 0 ? (
											Object.entries(metadata.ogTags).map(([key, value]) => (
												<div key={key} className="text-sm">
													<span className="font-mono text-gray-600">
														{key}:
													</span>
													<span className="ml-2 break-all text-gray-800">
														{value}
													</span>
												</div>
											))
										) : (
											<span className="text-sm text-gray-500">
												No Open Graph tags found
											</span>
										)}
									</div>
								</div>
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Twitter Card Tags
									</h3>
									<div className="max-h-60 space-y-1 overflow-y-auto rounded bg-gray-50 p-3">
										{Object.keys(metadata.twitterTags).length > 0 ? (
											Object.entries(metadata.twitterTags).map(
												([key, value]) => (
													<div key={key} className="text-sm">
														<span className="font-mono text-gray-600">
															{key}:
														</span>
														<span className="ml-2 break-all text-gray-800">
															{value}
														</span>
													</div>
												)
											)
										) : (
											<span className="text-sm text-gray-500">
												No Twitter Card tags found
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'technical' && (
						<div className="space-y-6">
							<div>
								<h3 className="mb-3 font-semibold text-gray-900">
									Response Headers
								</h3>
								<div className="max-h-60 space-y-1 overflow-y-auto rounded bg-gray-50 p-3">
									{Object.entries(metadata.responseHeaders).map(
										([key, value]) => (
											<div key={key} className="text-sm">
												<span className="font-mono text-gray-600">{key}:</span>
												<span className="ml-2 break-all text-gray-800">
													{value}
												</span>
											</div>
										)
									)}
								</div>
							</div>

							{metadata.structuredData.length > 0 && (
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Structured Data
									</h3>
									<div className="max-h-60 overflow-y-auto rounded bg-gray-50 p-3">
										<pre className="text-sm break-all whitespace-pre-wrap text-gray-800">
											{JSON.stringify(metadata.structuredData, null, 2)}
										</pre>
									</div>
								</div>
							)}
						</div>
					)}

					{activeTab === 'structure' && (
						<div className="space-y-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Heading Structure
									</h3>
									<div className="max-h-60 space-y-1 overflow-y-auto rounded bg-gray-50 p-3">
										{metadata.headings.map((heading, index) => (
											<div key={index} className="text-sm">
												<span
													className={`font-mono text-blue-600 ${
														heading.level === 'h1' ? 'font-bold' : ''
													}`}
												>
													{heading.level.toUpperCase()}:
												</span>
												<span className="ml-2 text-gray-800">
													{heading.text}
												</span>
											</div>
										))}
									</div>
								</div>
								<div>
									<h3 className="mb-3 font-semibold text-gray-900">
										Link Analysis
									</h3>
									<div className="space-y-2 text-sm">
										<div>
											<span className="font-medium">Internal Links:</span>{' '}
											{metadata.links.internal.length}
										</div>
										<div>
											<span className="font-medium">External Links:</span>{' '}
											{metadata.links.external.length}
										</div>
										<div>
											<span className="font-medium">Stylesheets:</span>{' '}
											{metadata.links.stylesheets.length}
										</div>
										<div>
											<span className="font-medium">Scripts:</span>{' '}
											{metadata.links.scripts.length}
										</div>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === 'security' && (
						<div className="space-y-6">
							<div>
								<h3 className="mb-3 font-semibold text-gray-900">
									Security Headers
								</h3>
								<div className="space-y-1 rounded bg-gray-50 p-3">
									{Object.keys(metadata.securityHeaders).length > 0 ? (
										Object.entries(metadata.securityHeaders).map(
											([key, value]) => (
												<div key={key} className="text-sm">
													<span className="font-mono text-gray-600">
														{key}:
													</span>
													<span className="ml-2 break-all text-gray-800">
														{value}
													</span>
												</div>
											)
										)
									) : (
										<span className="text-sm text-gray-500">
											No security headers found
										</span>
									)}
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="border-t border-gray-200 px-6 py-4">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<span className="text-center text-sm text-gray-600 sm:text-left">
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
							<pre className="scrollbar-hide max-h-96 overflow-auto rounded-lg bg-gray-900 p-4 text-sm break-all whitespace-pre-wrap text-green-400">
								{JSON.stringify(metadata, null, 2)}
							</pre>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
