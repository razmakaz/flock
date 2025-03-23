export const POST = async ({ request, locals }) => {
	// Extract email and password from the request
	const { email, provider } = await request.json();

	const availableProviders = ['discord'];

	if (provider !== 'email') {
		if (!availableProviders.includes(provider)) {
			return new Response(JSON.stringify({ success: false, message: 'Invalid provider' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}
		const { data, error } = await locals.supabase.auth.signInWithOAuth({
			provider,
			options: { redirectTo: `${process.env.PUBLIC_URL}/` }
		});

		console.log('Data:', data);
		console.log('Error:', error);
		if (error || !data) {
			return new Response(
				JSON.stringify({ success: false, message: error?.message || 'Unknown Error' }),
				{
					status: 500,
					headers: { 'Content-Type': 'application/json' }
				}
			);
		}
		return new Response(
			JSON.stringify({
				success: true,
				data,
				error
			})
		);
	}

	// Check if email and password are provided
	const { data, error } = await locals.supabase.auth.signInWithOtp({
		email: email,
		options: {
			shouldCreateUser: true
		}
	});

	console.log('Data:', data);
	console.log('Error:', error);

	if (error || !data) {
		return new Response(
			JSON.stringify({ success: false, message: error?.message || 'Unknown Error' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	return new Response(
		JSON.stringify({
			success: true
		}),
		{
			status: 302,
			headers: { Location: '/otp' }
		}
	);
};
