import type { Cookies } from '@sveltejs/kit';
import type { CookieSerializeOptions } from 'cookie';

// export const setLangCookie = (cookies: Cookies, lang: string) => {
// 	cookies.set('lang', lang, {
// 		sameSite: 'strict',
// 		secure: false,
// 		httpOnly: false,
// 		maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
// 		path: '/'
// 	});
// };

export const getCookie = (cookies: Cookies, name: string) => {
	const cookie = cookies.get(name);
	try {
		if (!cookie) {
			return null;
		}
		return JSON.parse(cookie);
	} catch (e) {
		console.log('Error parsing cookie', e);
		return null;
	}
};

export const setCookie = (
	cookies: Cookies,
	name: string,
	value: string,
	overrides?: CookieSerializeOptions
) => {
	cookies.set(name, value, {
		path: '/',
		sameSite: 'strict',
		httpOnly: true,
		secure: true,
		maxAge: 60 * 60 * 24 * 30, // 30 days
		...overrides
	});
};

export const deleteCookie = (cookies: Cookies, name: string) => {
	cookies.set(name, '', {
		path: '/',
		maxAge: 0
	});
};
