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
		},
		{
			title: $t('pricing.custom.title'),
			frequency: $t('pricing.custom.frequency'),
			bestFor: $t('pricing.custom.bestFor')
		}
	];
</script>

{#snippet PricingSnippet(section)}
	<div></div>
{/snippet}

<section class="relative w-full"></section>
