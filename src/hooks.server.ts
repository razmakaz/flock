import {
	PRIVATE_POCKETBASE_SERVICE_USERNAME,
	PRIVATE_POCKETBASE_SERVICE_PASSWORD
} from '$env/static/private';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import type { Handle, ServerInit } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export let serverPB: PocketBase;

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};

export const init: ServerInit = async () => {
	// Initialize the PocketBase server service account.
	serverPB = new PocketBase(PUBLIC_POCKETBASE_URL);
	console.log('Initializing PocketBase service account...');
	await serverPB
		.collection('users')
		.authWithPassword(PRIVATE_POCKETBASE_SERVICE_USERNAME, PRIVATE_POCKETBASE_SERVICE_PASSWORD)
		.then((res) => {
			console.log('Authenticated as service account:', res);
		})
		.catch((err) => {
			console.error('Failed to authenticate service account:', err);
		});
};
