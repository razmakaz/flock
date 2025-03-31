<script>
	import { t } from '$lib/translations.svelte';

	$: features = [
		{
			title: $t('landing.features.timeEntry'),
			body: $t('services.')
		},
		{
			title: $t('landing.features.invoicing'),
			body: $t('services.')
		},
		{
			title: $t('landing.features.crossFeatureTools'),
			body: $t('services.')
		},
		{
			title: $t('landing.features.integrations'),
			body: $t('services.')
		}
	];
</script>

{#snippet FeatureCards(section)}
	<ul class="list-style-none flex flex-col gap-6 text-center md:flex-row">
		{#each section as item}
			<li>
				<h3 class="text-lg">{item.title}</h3>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet FeatureCallToAction(section)}
	<div>
		<h2 class="text-5xl">{$t('landing.features.sectionTitle')}</h2>
		<p class="text-lg">
			{$t('landing.features.featureTagline')}
		</p>
	</div>
{/snippet}

<section class="w-full px-4 py-24">
	<div class="bg-base-200 mx-auto flex w-full max-w-7xl gap-12 p-6 sm:p-16">
		{@render FeatureCallToAction(section)}
		{@render FeatureCards(features)}
	</div>
</section>
