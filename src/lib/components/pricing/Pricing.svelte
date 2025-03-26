<script lang="ts">
	import { t } from '$lib/translations.svelte';

	$: pricing = [
		{
			title: $t('pricing.free.title'),
			frequency: $t('pricing.free.frequency'),
			bestFor: $t('pricing.free.bestFor')
		},
		{
			title: $t('pricing.license.title'),
			frequency: $t('pricing.license.frequency'),
			bestFor: $t('pricing.license.bestFor')
		},
		{
			title: $t('pricing.subscription.title'),
			frequency: $t('pricing.subscription.frequency'),
			bestFor: $t('pricing.subscription.bestFor')
		}
	];
</script>

{#snippet PricingSnippet(section)}
	{#each section as item}
		<div class="border-base-300 h-full w-full flex-col border-2 p-6 shadow-lg">
			<h2 class="text-4xl">{item.title}</h2>
			<p>{item.frequency}</p>
			<p>{item.bestFor}</p>
		</div>
	{/each}
{/snippet}

<section class="relative w-full py-16">
	<div class="mx-auto flex h-full max-w-7xl justify-between gap-16">
		{@render PricingSnippet(pricing)}
	</div>
</section>
