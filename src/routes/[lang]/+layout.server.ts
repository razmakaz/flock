import type { ISession } from '$lib/@types/system/ISession.js';
import { getCookie } from '$lib/server/cookies.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ request, locals, fetch, url, cookies }) => {
	const theme = await fetch('/theme').then((res) => res.text());

	const session = getCookie(cookies, 'session');

	// console.log('got session', session);

	const { lang } = locals;

	// if (session && url.pathname === `/${lang}`) {
	// 	const redirectUrl = new URL(`/${lang}/app`, url);
	// 	throw redirect(302, redirectUrl.toString());
	// }

	return {
		session,
		lang,
		theme
	} as {
		session: ISession | null;
		lang: string;
		theme: string;
	};
};
