export const load = async ({ locals }) => {
	if (!locals.session) {
		return { session: null };
	} else {
		// If they're already logged in
		// redirect them to the home page
		throw new Response('Already logged in', { status: 302, headers: { Location: '/' } });
	}
};

export const actions = {
	register: async (event) => {
		const { email, password } = await event.request.json();

		const { data, error } = await event.locals.supabase.auth.signUp({
			email,
			password
		});

		if (error || !data) {
			return {
				errors: ['Failed to create account'],
				status: 400
			};
		}

		return {
			message: 'Account created successfully',
			status: 200
		};
	}
};
