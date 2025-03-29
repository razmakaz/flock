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

<section class="w-full px-4 py-24">
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-12">
		<div class="flex flex-col gap-2 text-center">
			<h2 class="text-5xl">{$t('landing.features.sectionTitle')}</h2>
			<p class="text-lg">
				{$t('landing.features.featureTagline')}
			</p>
		</div>

		{@render FeatureSection(features)}
	</div>
</section>
