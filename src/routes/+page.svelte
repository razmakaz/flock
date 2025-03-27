<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import { t } from '$lib/translations.svelte';
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	onMount(() => {
		console.log('Page mounted');
	});

	$: features = [
		{
			title: $t('landing.features.timeEntry'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '
		},
		{
			title: $t('landing.features.invoicing'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '
		},
		{
			title: $t('landing.features.crossFeatureTools'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '
		},
		{
			title: $t('landing.features.integrations'),
			body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '
		}
	];
</script>

<svelte:head>
	<title>{$t('seo.landing.title')}</title>
	<meta name="description" content="A simple landing page for our application." />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

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

<!-- TODO: Add images above each feature item -->
{#snippet FeatureSection(section)}
	<ul class="list-style-none flex flex-col gap-6 text-center md:flex-row">
		{#each section as item}
			<li>
				<h3 class="text-lg">{item.title}</h3>
				<p class="">{item.body}</p>
			</li>
		{/each}
	</ul>
{/snippet}

<div class="flex h-fit flex-col gap-4">
	<Hero />

	<section class="bg-base-300 w-full py-24">
		<div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4">
			<div class="flex flex-col gap-2 text-center">
				<h2 class="text-5xl">{$t('landing.features.sectionTitle')}</h2>
				<p class="text-lg">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
			</div>

			{@render FeatureSection(features)}
		</div>
	</section>

	<Footer />
</div>
