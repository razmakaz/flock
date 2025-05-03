// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ISession } from '$lib/@types/system/ISession';
import PocketBase from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: string;
			session: ISession | null;
			pocketbase: PocketBase;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
