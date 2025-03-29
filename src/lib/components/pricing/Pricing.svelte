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
			bestFor: $t('pricing.license.bestFor'),
			inclusions: $t('pricing.license.inclusions')
		},
		{
			title: $t('pricing.subscription.title'),
			frequency: $t('pricing.subscription.frequency'),
			bestFor: $t('pricing.subscription.bestFor'),
			inclusions: $t('pricing.subscriptions.inclusions')
		}
	];
</script>

{#snippet PricingSnippet(section)}
	{#each section as item}
		<div
			class="bg-base-100 transition-ease hover:scale-[] grid w-full cursor-pointer grid-rows-2 gap-2 p-6 shadow-lg duration-200 hover:-translate-y-[5px]"
		>
			<h2 class="text-3xl">{item.title}</h2>
			<p class="text-lg">{item.frequency}</p>
		</div>
	{/each}
{/snippet}

<section class="relative w-full">
	<div class="mx-auto flex h-fit max-w-7xl justify-between gap-16">
		{@render PricingSnippet(pricing)}
	</div>
</section>
