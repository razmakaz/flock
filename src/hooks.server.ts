// import { PUBLIC_PB_URL } from "$env/static/public";
import { setCookie } from '$lib/server/cookies';
import type { Handle, HandleServerError } from '@sveltejs/kit';
// import PocketBase from "pocketbase";
import * as Sentry from '@sentry/sveltekit';

const SUPPORTED_LANGUAGES = ['en', 'es'];

export const handle: Handle = async ({ event, resolve }) => {
	// // Set up PocketBase
	// const pb = new PocketBase(PUBLIC_PB_URL);
	// pb.authStore.loadFromCookie(event.request.headers.get("cookie") || "");
	// event.locals.pocketbase = pb;

	// Set up language
	let lang = event.cookies.get('lang');
	if (!lang) {
		lang = event.request.headers.get('Accept-Language')?.substring(0, 2) || 'en';
	}
	event.locals.lang = lang;
	setCookie(event.cookies, 'lang', lang, {
		maxAge: 60 * 60 * 24 * 365 * 100 // 100 years
	});

	// Redirect to use language if not already
	const langFromUrl = event.url.pathname.split('/')[1];

	// Check if it's a supported language
	if (!SUPPORTED_LANGUAGES.includes(langFromUrl)) {
		// Get language from cookies, headers, or fallback to 'en'
		let lang = event.cookies.get('lang');

		if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
			const acceptLang = event.request.headers.get('accept-language');
			if (acceptLang) {
				lang = acceptLang.split(',')[0].split('-')[0];
			}
		}

		if (!lang || !SUPPORTED_LANGUAGES.includes(lang)) {
			lang = 'en';
		}

		// Redirect to the correct language-prefixed URL
		return Response.redirect(new URL(`/${lang}${event.url.pathname}`, event.url), 307);
	} else if (langFromUrl !== event.locals.lang && !event.url.pathname.includes('/lang')) {
		// Redirect to the selected language if it doesn't match the current URL
		// and it's not a language selection page
		return Response.redirect(
			new URL(
				`/${event.locals.lang}${event.url.pathname.slice(langFromUrl.length + 1)}`,
				event.url
			),
			307
		);
	}

	const response = await resolve(event);
	return response;
};

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	const errorId = crypto.randomUUID();

	Sentry.captureException(error, {
		extra: { event, errorId, status, message }
	});

	console.log(`Error ID: ${errorId}`);
	console.error(error);

	return {
		message: 'Whoops!',
		errorId
	};
};
