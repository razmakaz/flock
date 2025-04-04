import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export interface App {
	lang: string;
	theme: string;
	supabase: SupabaseClient | null;
	session: Session | null;
}

const App = writable<App>({
	lang: "en",
	theme: "light",
	supabase: null,
	session: null,
});

export default App;
