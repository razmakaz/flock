<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import '../../app.css';
	import Navbar from '$lib/components/nav/Navbar.svelte';
	import App from '$lib/stores/App';
	import type { Unsubscriber } from 'svelte/store';
	import { PUBLIC_ENVIRONMENT } from '$env/static/public';
	import { page } from '$app/state';

	let { data, children } = $props();

	const noui = page.url.searchParams.get('noui');

	// console.log(data);

	let ready = $state(false);

	let appHandler: Unsubscriber;

	// Apply data.theme as css to the document

	onMount(() => {
		App.update((s) => {
			if (data.session) {
				s.pb.authStore.save(data.session.token, data.session.record);
				if (!s.pb.authStore.isValid) {
					s.pb
						.collection('users')
						.authRefresh()
						.then((session) => {
							fetch('/login', {
								method: 'PUT',
								body: JSON.stringify({
									...session
								})
							})
								.then((res) => res.json())
								.then((res) => {
									// console.log('Session refreshed', res);
									s.session = data.session;
								});
						})
						.catch((err) => {
							s.pb.authStore.clear();
							fetch('/login', {
								method: 'DELETE'
							});
						});
				} else {
					s.session = data.session;
				}
			} else {
				// console.log('Unauthenticated');
			}
			return s;
		});
		// Register Service Worker
		if ('serviceWorker' in navigator && PUBLIC_ENVIRONMENT === 'prod') {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					// console.log('Service Worker registered with scope:', registration.scope);
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
				document.documentElement.setAttribute('data-theme', s.theme);
			}

			// Update the local storage with the new theme
			localStorage.setItem('floc', JSON.stringify({ lang: s.lang, theme: s.theme }));
		});

		ready = true;
	});

	onDestroy(() => {
		// Unsubscribe from the App store
		appHandler?.();
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="/theme" />

	<style>
		:root {
			--fc-small-font-size: 0.85em;
			--fc-page-bg-color: transparent;
			--fc-neutral-bg-color: var(--color-neutral);
			--fc-neutral-text-color: var(--color-neutral-content);
			--fc-border-color: var(--color-base-300);
			--fc-button-text-color: var(--color-base-content);
			--fc-button-bg-color: var(--color-base-100);
			--fc-button-border-color: var(--color-primary);
			--fc-button-hover-bg-color: var(--color-primary);
			--fc-button-hover-border-color: var(--color-primary);
			--fc-button-active-bg-color: var(--color-primary);
			--fc-button-active-border-color: var(--color-primary);
			--fc-event-bg-color: var(--color-primary);
			--fc-event-border-color: var(--color-primary);
			--fc-event-text-color: var(--color-primary-content);
			--fc-event-selected-overlay-color: rgba(0, 0, 0, 0.25);
			--fc-more-link-bg-color: #d0d0d0;
			--fc-more-link-text-color: inherit;
			--fc-event-resizer-thickness: 8px;
			--fc-event-resizer-dot-total-width: 8px;
			--fc-event-resizer-dot-border-width: 1px;
			--fc-non-business-color: var(--color-accent);
			--fc-bg-event-color: #8fdf82;
			--fc-bg-event-opacity: 0.3;
			--fc-highlight-color: transparent;
			--fc-today-bg-color: var(--color-base-200);
			--fc-now-indicator-color: var(--color-accent);
			--fc-list-event-dot-width: 10px;
			--fc-daygrid-event-dot-width: 8px;
			--fc-list-event-hover-bg-color: var(--color-base-200);
		}
	</style>
</svelte:head>

{#if noui}
	{@render children()}
{:else if ready}
	{#if !$App.session}
		<Navbar />
	{/if}
	<div>
		{@render children()}
	</div>
{/if}
