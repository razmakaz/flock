<script lang="ts">
	import { scale } from 'svelte/transition';
	import Pricing from '$lib/components/pricing/Pricing.svelte';
	import { t } from '$lib/translations.svelte';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import App from '$lib/stores/App';
	import numeral from 'numeral';
	import { cubicOut } from 'svelte/easing';
	import Faq from '$lib/components/pricing/Faq.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

	let state = $state({
		openCategories: []
	});

	const genItems = () => {
		return {
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
							tooltip: $t('services.accountingIntegrations.quickenTooltip')
						},
						{
							name: $t('services.accountingIntegrations.netSuite'),
							free: false,
							license: false,
							subscription: true,
							tooltip: $t('services.accountingIntegrations.netSuiteTooltip')
						},
						{
							name: $t('services.accountingIntegrations.sageIntacct'),
							free: false,
							license: false,
							subscription: true,
							tooltip: $t('services.accountingIntegrations.sageIntacctTooltip')
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
	};

	let _pricing = $state(genItems());

	const handleToggleCategory = (category: string) => {
		if (state.openCategories.includes(category)) {
			state.openCategories = state.openCategories.filter((c) => c !== category);
		} else {
			state.openCategories = [...state.openCategories, category];
		}
	};

	onMount(() => {
		t.subscribe(() => {
			_pricing = genItems();
		});
	});
</script>

{#snippet Rating(stars)}
	<div class="rating">
		{#each Array.from({ length: 5 }, (_, i) => i + 1) as star, i}
			<div
				class="mask mask-squircle scale-[0.8] {i <= stars ? 'bg-primary' : 'bg-neutral'}"
				aria-label="{star} star"
				aria-current={i === stars}
			></div>
		{/each}
	</div>
{/snippet}

{#snippet ItemValue(value)}
	<div class="flex items-center justify-center">
		{#if typeof value == 'boolean'}
			<Icon class="text-xl font-bold" icon={value ? 'akar-icons:check' : 'akar-icons:cross'} />
		{:else if value == null}
			<Icon class="text-xl font-bold" icon="akar-icons:minus" />
		{:else if typeof value == 'number'}
			<div>{numeral(value).format('$0,0.00')}</div>
		{:else}
			<div>{value}</div>
		{/if}
	</div>
{/snippet}

{#snippet OpenCategories(pricing)}
	<section class="grid grid-cols-[1fr_auto_auto_auto] gap-8">
		{#each pricing.categories as category}
			<button
				class="flex cursor-pointer items-center gap-2 text-left text-xl font-bold"
				onclick={() => handleToggleCategory(category.name)}
			>
				<div
					class="transition-all duration-75 {state.openCategories.includes(category.name)
						? 'rotate-90'
						: ''}"
				>
					<Icon icon="material-symbols:chevron-right" width="24" height="24" />
				</div>
				<p>{category.name}</p>
			</button>
			{@render Rating(category.stars.free)}
			{@render Rating(category.stars.license)}
			{@render Rating(category.stars.subscription)}
			<div class="inner-contents contents">
				{#if state.openCategories.includes(category.name)}
					{#each category.items as item}
						<div class="flex pl-12">
							<div class="tooltip tooltip-bottom lg:tooltip-right">
								<div class="tooltip-content p-4">
									<p class="">{item.tooltip}</p>
								</div>
								<p class={item.tooltip ? ' border-b border-dashed' : ''}>{item.name}</p>
							</div>
						</div>

						{@render ItemValue(item.free)}

						{@render ItemValue(item.license)}

						{@render ItemValue(item.subscription)}
					{/each}
				{/if}
			</div>
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
	<div class="mx-auto flex max-w-7xl flex-col gap-24">
		<h1 class="text-6xl">{$t('pricing.pageTitle')}</h1>
		<Pricing />

		{@render OpenCategories(_pricing)}

		<Faq />
	</div>
</main>
<Footer />
