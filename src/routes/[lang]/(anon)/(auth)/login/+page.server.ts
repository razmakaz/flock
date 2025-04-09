import { getCookie } from '$lib/server/cookies';
import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
	const session = getCookie(cookies, 'session');
	if (session) {
		throw redirect(302, '/');
	}
};
