import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
import { get, writable } from 'svelte/store';

export type TNotyType = 'toast' | 'snack' | 'banner';
export type TNotyStyle = 'success' | 'error' | 'info' | 'warning';
export interface INotyOptions {
	id: string;
	message: string;
	type: TNotyType;
	style: TNotyStyle;
	duration: number;
}

export interface INotyInput {
	style?: TNotyStyle;
	type?: TNotyType;
	duration?: number;
}

/**
 * @class CRAPI - Composable RESTful API
 * @description A class that provides a composable RESTful API for use across the application.
 */
class CRAPI {
	static db = new PocketBase(PUBLIC_POCKETBASE_URL);

	/**
	 * @deprecated This hasn't been implemented yet.
	 * @description A simple fetch method to make API requests.
	 */
	static api = {
		async fetch(url: string, options?: RequestInit) {
			return await fetch(url, options);
		},
		async get(url: string, options?: RequestInit) {
			return await fetch(url, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...options?.headers
				},
				...options
			});
		},
		async post(url: string, body: string | FormData | null, options?: RequestInit) {
			return await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...options?.headers
				},
				body,
				...options
			}).then((res) => res.json());
		}
	};

	static notify = {
		store: writable<INotyOptions[]>([]),
		trigger: (
			message: string,
			{ style = 'success', type = 'toast', duration = 3000 }: INotyInput
		): void => {
			// Create a unique ID for the notification
			const id = Math.random().toString(36).substring(2, 15);

			// Push the notification to the store
			CRAPI.notify.store.update((s) => {
				s.push({ message, style, type, id, duration });
				return s;
			});

			// Remove the notification after the specified duration
			setTimeout(() => {
				const items = get(CRAPI.notify.store);
				CRAPI.notify.store.set(items.filter((noty) => noty.id !== id));
			}, duration);
		},
		dismiss: (id: string) => {
			CRAPI.notify.store.update((s) => {
				return s.filter((noty) => noty.id !== id);
			});
		},
		clear: () => {
			CRAPI.notify.store.set([]);
		}
	};

	static tools = {};
}

export default CRAPI;
