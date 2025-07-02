export async function GET() {
	return Response.json({
		status: 'healthy',
		service: 'MetaPeek',
		version: '1.0.0',
		timestamp: new Date().toISOString(),
	});
}
