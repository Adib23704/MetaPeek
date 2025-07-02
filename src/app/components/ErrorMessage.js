export default function ErrorMessage({ error }) {
	if (!error) return null

	return (
		<div className="mx-auto mt-6 w-full max-w-xs px-4 sm:mt-8 sm:max-w-lg sm:px-0 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
			<div className="rounded-lg border border-red-200 bg-red-50 p-3 sm:p-4">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
					<div className="flex-shrink-0 self-start sm:self-center">
						<svg
							className="h-4 w-4 text-red-400 sm:h-5 sm:w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<div className="min-w-0 flex-1">
						<h3 className="mb-1 text-sm font-medium text-red-800">
							Error fetching metadata
						</h3>
						<p className="text-xs break-words text-red-700 sm:text-sm">
							{error}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
