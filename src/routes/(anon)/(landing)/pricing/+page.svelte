<script lang="ts">
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import { t } from '$lib/translations.svelte';
</script>

<main class="relative min-h-screen px-4 py-24">
	<div
		class="rounded-b-field absolute
      inset-0
      -z-10
      -translate-y-1/2
      bg-gradient-to-r from-indigo-600 to-violet-600
      opacity-10 blur-[100px] transition-all
      duration-1000
      ease-out"
		style="height: 100vh;"
	></div>
	<div class="mx-auto max-w-7xl">
		<h1 class="text-6xl">{$t('pricing.pageTitle')}</h1>
		<Pricing />
	</div>
</main>
