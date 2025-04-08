import god from '$lib/server/god';
import Reply from '$lib/server/Reply';
import { ClientResponseError } from 'pocketbase';
import type { Cookies } from '@sveltejs/kit';

const storeSession = (cookies: Cookies, session: object) => {
	console.log('Storing session', session);
	cookies.set('pocketbase_auth', JSON.stringify(session), {
		path: '/',
		sameSite: 'lax',
		httpOnly: true,
		secure: false,
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});
};

export const POST = async ({ request }) => {
	const data = await request.json();

	const { email } = data;

	let user = null;

	// Check if the user already exists
	try {
		const list = await god.collection('users').getFullList({
			filter: `email="${email}"`
		});

		if (list.length > 0) {
			user = list.pop();
		}
	} catch (e) {
		if (e instanceof ClientResponseError && e.status === 404) {
			// Do nothing
		} else {
			// console.log(e);
			return Reply({
				success: false,
				errors: ['An error occurred.']
			});
		}
	}

	// If the user doesn't exist, create them
	if (!user) {
		try {
			console.log('Creating user', email);
			const password = Math.random().toString(36).slice(2);
			const createdUser = await god.collection('users').create({
				email,
				verified: false,
				password: password,
				passwordConfirm: password
			});
			console.log('Created user', createdUser);
		} catch (e) {
			if (e instanceof ClientResponseError) {
				console.log(e.response);
			} else {
				console.log(e);
			}
		}
	}

	// Send the OTP
	await god.collection('users').requestOTP(email);

	return Reply({
		success: true,
		messages: ['Check your email for a link to log in.']
	});
};

export const PUT = async ({ request, cookies }) => {
	const data = await request.json();

	console.log('Storing session');
	storeSession(cookies, data);

	return Reply({
		messages: ['OK']
	});
};
