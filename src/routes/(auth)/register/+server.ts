import { z } from 'zod';
import { serverPB } from '../../../hooks.server.js';
import { APIResponse } from '$lib/tools/APITools.js';
import { ClientResponseError } from 'pocketbase';

const UserSchema = z
	.object({
		email: z.string().email('Invalid email address'),
		password: z.string().min(12, 'Password must be at least 12 characters long'),
		passwordConfirm: z.string().min(12, 'Password must be at least 12 characters long')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords don't match"
	});

export const POST = async (event) => {
	const { email, password, passwordConfirm } = await event.request.json();

	// Validate the request body
	const parsedBody = UserSchema.safeParse({ email, password, passwordConfirm });
	if (!parsedBody.success) {
		return APIResponse({
			errors: parsedBody.error.errors.map((err) => err.message),
			status: 400
		});
	}

	try {
		await serverPB.collection('users').create({
			email,
			password,
			passwordConfirm
		});
	} catch (err) {
		if (err instanceof ClientResponseError) {
			const emailError = err.response.data.email || null;
			console.log(err.response.data);
			if (emailError.code == 'validation_not_unique') {
				return APIResponse({
					errors: ['Email already exists'],
					status: 400
				});
			}

			return APIResponse({
				errors: ['An unknown error occurred'],
				status: 400
			});
		}
		return APIResponse({
			errors: ['An unknown error occurred'],
			status: 400
		});
	}

	return APIResponse({
		message: 'User registered successfully',
		status: 201
	});
};
