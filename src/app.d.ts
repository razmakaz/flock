// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Session, SupabaseClient } from "@supabase/supabase-js";
import PocketBase from "pocketbase";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: string;
			pocketbase: PocketBase;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
