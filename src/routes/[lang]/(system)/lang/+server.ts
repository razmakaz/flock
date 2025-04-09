import { setCookie } from '$lib/server/cookies.js';
import Reply from '$lib/server/Reply.js';

export const POST = async ({ cookies, params }) => {
	const { lang } = params;
	// console.log('lang', lang);

	if (!lang) {
		return Reply({
			status: 400,
			errors: ['Missing lang']
		});
	}

	setCookie(cookies, 'lang', lang, {
		maxAge: 60 * 60 * 24 * 365 * 100 // 100 years
	});

	return Reply({
		messages: ['Lang set']
	});
};
