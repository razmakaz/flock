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
				name: $t('services.timesheet.title'),
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
					},
					{
						name: $t('services.timesheet.timeclock'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.timeclockTooltip')
					},
					{
						name: $t('services.timesheet.taskTracking'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.taskTrackingTooltip')
					},
					{
						name: $t('services.timesheet.overtime'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.overtimeTooltip')
					},
					{
						name: $t('services.timesheet.liveReporting'),
						free: false,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.liveReportingTooltip')
					},
					{
						name: $t('services.timesheet.forecasting'),
						free: false,
						license: true,
						subscription: true,
						tooltip: $t('services.timesheet.forecastingTooltip')
					},
					{
						name: $t('services.timesheet.teams'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.timesheet.teamsTooltip')
					},
					{
						name: $t('services.timesheet.scheduleGeneration'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.timesheet.scheduleGenerationTooltip')
					},
					{
						name: $t('services.timesheet.shiftApprovals'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.timesheet.shiftApprovalsTooltip')
					},
					{
						name: $t('services.timesheet.textReminders'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.timesheet.textRemindersTooltip')
					}
				]
			},
			{
				name: $t('services.invoicing.title'),
				stars: {
					free: 2,
					license: 3,
					subscription: 5
				},

				items: [
					{
						name: $t('services.invoicing.contractManagement'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.contractManagementTooltip')
					},
					{
						name: $t('services.invoicing.lateFees'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.lateFeesTooltip')
					},
					{
						name: $t('services.invoicing.remittanceAdvice'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.remittanceAdviceTooltip')
					},
					{
						name: $t('services.invoicing.revisions'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.revisionsTooltip')
					},
					{
						name: $t('services.invoicing.creditMemos'),
						free: true,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.creditMemosTooltip')
					},
					{
						name: $t('services.invoicing.forecastingTools'),
						free: false,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.forecastingToolsTooltip')
					},
					{
						name: $t('services.invoicing.dunningNotices'),
						free: false,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.dunningNoticesTooltip')
					},
					{
						name: $t('services.invoicing.disputeHandling'),
						free: false,
						license: true,
						subscription: true,
						tooltip: $t('services.invoicing.disputeHandlingTooltip')
					},
					{
						name: $t('services.invoicing.mailingInvoices'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.invoicing.mailingInvoicesTooltip')
					}
				]
			},
			{
				name: $t('services.ai.title'),
				stars: {
					free: 2,
					license: 3,
					subscription: 5
				},

				items: [
					{
						name: $t('services.ai.textToShifts'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.textToShiftsTooltip')
					},
					{
						name: $t('services.ai.scheduleImport'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.scheduleImportTooltip')
					},
					{
						name: $t('services.ai.contractImport'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.contractImportTooltip')
					},
					{
						name: $t('services.ai.timecardParsing'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.timecardParsingTooltip')
					},
					{
						name: $t('services.ai.csvImport'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.csvImportTooltip')
					},
					{
						name: $t('services.ai.autoDisputeHandling'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.ai.autoDisputeHandlingTooltip')
					}
				]
			},
			{
				name: $t('services.accountingIntegrations.title'),
				stars: {
					free: 2,
					license: 3,
					subscription: 5
				},

				items: [
					{
						name: $t('services.accountingIntegrations.quickBooks'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.quickBooksToolTip')
					},
					{
						name: $t('services.accountingIntegrations.zohoBooks'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.zohoBooksToolTip')
					},
					{
						name: $t('services.accountingIntegrations.freshBooks'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.freshBooksToolTip')
					},
					{
						name: $t('services.accountingIntegrations.xero'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.xeroToolTip')
					},
					{
						name: $t('services.accountingIntegrations.quicken'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.quickenToolTip')
					},
					{
						name: $t('services.accountingIntegrations.netSuite'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.netSuiteToolTip')
					},
					{
						name: $t('services.accountingIntegrations.sageIntacct'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.accountingIntegrations.sageIntacctToolTip')
					}
				]
			},
			{
				name: $t('services.payrollIntegrations.title'),
				stars: {
					free: 2,
					license: 3,
					subscription: 5
				},

				items: [
					{
						name: $t('services.payrollIntegrations.gusto'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.payrollIntegrations.gustoTooltip')
					},
					{
						name: $t('services.payrollIntegrations.adp'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.payrollIntegrations.adpTooltip')
					},
					{
						name: $t('services.payrollIntegrations.zeal'),
						free: false,
						license: false,
						subscription: true,
						tooltip: $t('services.payrollIntegrations.zealTooltip')
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
	{:else if value == null}
		<Icon icon="minus" />
	{:else if typeof value == 'number'}
		{value}
	{:else}
		{value}
	{/if}
{/snippet}

{#snippet OpenCategories(_pricing)}
	<section class="grid grid-cols-[1fr_auto_auto_auto] gap-8">
		{#each _pricing.categories as category}
			<button
				class=" text-left {category.tooltip
					? 'underline'
					: ''} trasnition cursor-pointer text-xl font-bold duration-200 hover:translate-x-2"
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
								<p class="">{item.tooltip}</p>
							</div>
							<p class="">{item.name}</p>
						</div>
					</div>
					<div class="flex justify-center">
						{#if item.free}
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M5 12L10 17L19 7"
									stroke="blue"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else}
							<div style="color: blue;">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 18L18 18L18 18L6 18"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/>
								</svg>
							</div>
						{/if}
					</div>
					<div class="flex justify-center">
						{#if item.license}
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M5 12L10 17L19 7"
									stroke="blue"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else}
							<div style="color: blue;">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 18L18 18L18 18L6 18"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/>
								</svg>
							</div>
						{/if}
					</div>
					<div class="flex justify-center">
						{#if item.subscription}
							<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M5 12L10 17L19 7"
									stroke="blue"
									stroke-width="2"
									fill="none"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else}
							<div style="color: blue;">
								<svg
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 18L18 18L18 18L6 18"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									/>
								</svg>
							</div>
						{/if}
					</div>
				{/each}
			{/if}
		{/each}
	</section>
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

		{@render OpenCategories(_pricing)}
	</div>
</main>
