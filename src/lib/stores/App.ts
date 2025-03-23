import { writable } from 'svelte/store';

export interface App {
	lang: string;
	theme: string;
}

export default writable<App>({
	lang: 'en',
	theme: 'light'
});
