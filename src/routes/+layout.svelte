<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../app.css';
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import App from '$lib/stores/App';
	import type { Unsubscriber } from 'svelte/store';
	import { setLocale } from '$lib/translations.svelte';

	let { data, children } = $props();

	// const { session } = data;

	let ready = $state(false);

	let appHandler: Unsubscriber;

	onMount(() => {
		// Register Service Worker
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					console.log('Service Worker registered with scope:', registration.scope);
				})
				.catch((error) => {
					console.error('Service Worker registration failed:', error);
				});
		}

		// Set the default language and theme based on the user's browser settings
		if (typeof window !== 'undefined') {
			// Get the user's language
			const lang = navigator.language.split('-')[0] || 'en';

			// Get the user's theme preference
			let theme = 'light';

			// Check for dark mode
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				theme = 'dark';
			}

			// Update the store with the user's language and theme
			App.update((s) => {
				s.lang = lang;
				s.theme = theme;
				return s;
			});
		}

		// If there is a saved language and theme, update the store
		const storage = localStorage.getItem('floc');
		if (storage) {
			const { lang, theme } = JSON.parse(storage);
			App.update((s) => {
				s.lang = lang;
				s.theme = theme;
				return s;
			});
		}

		// Subscribe to the App store to update the theme
		appHandler = App.subscribe((s) => {
			if (s.theme) {
				document.documentElement.setAttribute('data-theme', 'floc-' + s.theme);
			}

			if (s.lang) {
				setLocale(s.lang);
			}

			// Update the local storage with the new theme
			localStorage.setItem('floc', JSON.stringify({ lang: s.lang, theme: s.theme }));
		});

		// Set ready to true
		ready = true;

		// Redirect to /app if the user is already logged in
		// if (session) {
		// 	goto('/app');
		// 	return;
		// }
	});

	onDestroy(() => {
		// Unsubscribe from the App store
		appHandler?.();
	});
</script>

{#if ready}
	<Navbar />
	<div>
		{@render children()}
	</div>
{/if}
