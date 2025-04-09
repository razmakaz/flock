<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Features from '$lib/components/landing/Features.svelte';
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import App from '$lib/stores/App';
	import { nav } from '$lib/client/navigation';

	onMount(() => {
		console.log('Page mounted');
		if ($App.session) {
			nav('/app');
		}
	});
</script>

<svelte:head>
	<title>{$t('seo.landing.title')}</title>
	<meta name="description" content="A simple landing page for our application." />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={$t('seo.landing.title')} />
	<meta property="og:description" content={$t('seo.landing.description')} />
	<meta property="og:image" content="%sveltkeit_head%/img/floc-alt.svg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content={$t('seo.landing.title')} />
	<meta property="twitter:description" content={$t('seo.landing.description')} />
	<meta property="twitter:image" content="%sveltkeit_head%/img/floc-alt.svg" />
</svelte:head>

<main class="flex h-fit flex-col gap-4">
	<Hero />

	<Features />

	<Pricing />
</main>
<Footer />
