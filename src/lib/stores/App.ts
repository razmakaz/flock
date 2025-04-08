import { writable } from "svelte/store";
import PocketBase from "pocketbase";
import { PUBLIC_PB_URL } from "$env/static/public";

export interface App {
	lang: string;
	theme: string;
	session: null | { token: string; record: object };
	pb: PocketBase;
}

const App = writable<App>({
	lang: "en",
	theme: "light",
	session: null,
	pb: new PocketBase(PUBLIC_PB_URL),
});

export default App;
