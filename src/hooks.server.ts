// import { PRIVATE_SUPABASE_URL, PRIVATE_SUPABASE_ANON_KEY } from '$env/static/private';
// import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// event.locals.supabase = createClient(PRIVATE_SUPABASE_URL, PRIVATE_SUPABASE_ANON_KEY, {
	// 	auth: {
	// 		persistSession: false,
	// 		autoRefreshToken: false,
	// 		detectSessionInUrl: false
	// 	}
	// });

	const response = await resolve(event);
	return response;
};
