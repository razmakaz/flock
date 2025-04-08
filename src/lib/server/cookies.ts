import type { Cookies } from '@sveltejs/kit';

export const setLangCookie = (cookies: Cookies, lang: string) => {
	cookies.set('lang', lang, {
		sameSite: 'strict',
		secure: false,
		httpOnly: false,
		maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
		path: '/'
	});
};

// export const getCookie = (cookies: Cookies, name: string) => {
// 	const cookie = cookies.get(name);
// 	return JSON.parse(cookie || '') || cookie || null;
// };

// export const setCookie = (cookies: Cookies, name: string, value: string) => {
// 	cookies.set(name, value, {
// 		path: '/',
// 		sameSite: 'strict',
// 		httpOnly: true,
// 		secure: true,
// 		maxAge: 60 * 60 * 24 * 30 // 30 days
// 	});
// };

// export const deleteSessionCookie = (cookies: Cookies, name: string) => {
// 	cookies.set(name, '', {
// 		path: '/',
// 		maxAge: 0
// 	});
// };
