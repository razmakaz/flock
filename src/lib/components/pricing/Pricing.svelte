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
		<div
			class="bg-base-100 transition-ease flex h-full w-full flex-col gap-2 p-6 shadow-lg duration-200 hover:scale-[1.1]"
		>
			<h2 class="text-4xl">{item.title}</h2>
			<p class="text-lg">{item.frequency}</p>

			<div></div>
		</div>
	{/each}
{/snippet}

<section class="relative w-full py-16">
	<div class="mx-auto flex h-fit max-w-7xl justify-between gap-16">
		{@render PricingSnippet(pricing)}
	</div>
</section>
