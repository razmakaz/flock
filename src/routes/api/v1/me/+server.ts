import Reply from '$lib/server/Reply.js';

export const GET = async ({ locals }) => {
	try {
		// Assuming locals.user contains the authenticated user's information
		const user = locals.pocketbase.authStore.record;

		if (!user) {
			return Reply({
				success: false,
				errors: ['User not authenticated'],
				status: 401
			});
		}

		// Return user information
		return Reply({
			success: true,
			data: user,
			status: 200
		});
	} catch (error) {
		console.error('Error fetching user data:', error);
		return Reply({
			success: false,
			errors: ['Internal server error'],
			status: 500
		});
	}
};
