import { decodeJWT } from '$lib/server/jwt.js';
import { validateSession } from '$lib/server/session.js';

export const load = async ({ request, locals, fetch, url, cookies }) => {
	const theme = await fetch('/theme').then((res) => res.text());

	// const session = await validateSession(cookies);
	// if (session) {
	// 	const decoded = await decodeJWT(session);
	// 	if (decoded) {
	// 		locals.session = decoded;
	// 	}
	// }

	const { lang } = locals;

	return {
		session: null,
		lang,
		theme
	};
};
