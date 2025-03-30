import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';

export interface App {
	lang: string;
	theme: string;
	supabase: SupabaseClient | null;
	session: Session | null;
}

export default writable<App>({
	lang: 'en',
	theme: 'light',
	supabase: null,
	session: null
});
