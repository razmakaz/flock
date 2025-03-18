export const load = async ({ locals }) => {
	if (!locals.session) {
		return {
			session: null
		};
	} else {
		// If they're already logged in
		// redirect them to the home page
		throw new Response('Already logged in', { status: 302, headers: { Location: '/' } });
	}
};

export const actions = {
	default: async (event) => {
		const form = await event.request.json();
		const email = form['email'] as string;
		const password = form['password'] as string;

		console.log(email, password);

		const { data, error } = await event.locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error || !data) {
			return {
				errors: ['Invalid email or password'],
				status: 400
			};
		}

		return {
			message: 'Logged in successfully',
			status: 200
		};
	}
};
