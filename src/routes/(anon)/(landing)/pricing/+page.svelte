<script lang="ts">
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';

	let state = $state({
		openCategories: []
	});

	const _pricing = {
		tiers: [
			{
				title: $t('pricing.free.title'),
				monthlyPrice: 0,
				annualPrice: 0
			},
			{
				title: $t('pricing.license.title'),
				monthlyPrice: 10,
				annualPrice: 100
			},
			{
				title: $t('pricing.subscription.title'),
				monthlyPrice: 20,
				annualPrice: 200
			}
		],
		categories: [
			{
				name: $t('services.timesheets.title'),
				stars: {
					free: 2,
					license: 3,
					subscription: 5
				},
				items: [
					{
						name: $t('services.timesheet.projectRates'),
						free: 5,
						license: 15,
						subscription: 40,
						tooltip: $t('services.timesheet.projectRatesTooltip')
					},
					{
						name: $t('services.timesheet.miscBillables'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.miscBillablesTooltip')
					}
				]
			}
		]
	};

	const handleToggleCategory = (category: string) => {
		if (state.openCategories.includes(category)) {
			state.openCategories = state.openCategories.filter((c) => c !== category);
		} else {
			state.openCategories = [...state.openCategories, category];
		}
	};
</script>

{#snippet Rating(stars)}
	<div class="rating">
		{#each Array.from({ length: 5 }, (_, i) => i + 1) as star, i}
			<div class="mask mask-star" aria-label="{star} star" aria-current={i === stars}></div>
		{/each}
	</div>
{/snippet}

{#snippet ItemValue(value: boolean | number)}
	{#if typeof value == 'boolean'}
		<Icon icon={value ? 'check' : 'close'} />
	{:else}
		{value}
	{/if}
{/snippet}

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

		<!-- TODO: Implement features and dropdowns here with comparisons
        TODO: Create comparisons grid -->

		<!-- {@render TimeSheetSection(pricing)} -->

		<div class="grid grid-cols-[1fr_auto_auto_auto] gap-8">
			{#each _pricing.categories as category}
				<button
					class=" text-left {category.tooltip ? 'underline' : ''}"
					onclick={() => handleToggleCategory(category.name)}>{category.name}</button
				>
				{@render Rating(category.stars.free)}
				{@render Rating(category.stars.license)}
				{@render Rating(category.stars.subscription)}
				{#if state.openCategories.includes(category.name)}
					{#each category.items as item}
						<div class="flex">
							<div class="tooltip">
								<div class="tooltip-content">
									<p class="">{category.tooltip}</p>
								</div>
								<p class="">{item.name}</p>
							</div>
						</div>
						<p class="">{item.free}</p>
						<p class="">{item.license}</p>
						<p class="">{item.subscription}</p>
					{/each}
				{/if}
			{/each}
		</div>
	</div>
</main>
