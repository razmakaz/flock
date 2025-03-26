<script lang="ts">
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import { t } from '$lib/translations.svelte';
</script>

<main class="min-h-screen px-4 py-24">
	<div class="mx-auto max-w-7xl">
		<h1 class="text-6xl">{$t('pricing.pageTitle')}</h1>

		<Pricing />
	</div>
</main>
