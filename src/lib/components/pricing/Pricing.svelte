<script lang="ts">
	import { t } from '$lib/translations.svelte';

	// shorten pricing, probably dont need all of this in there

	$: pricing = [
		{
			title: $t('pricing.free.title'),
			frequency: $t('pricing.free.frequency'),
			bestFor: $t('pricing.free.bestFor'),

			// move these to the pricing page and out of pricing component, this can
			// be used for the drop downs instead
			timesheets: [
				$t('services.timesheet.projectRates'),
				$t('services.timesheet.miscBillables'),
				$t('services.timesheet.timeclock'),
				$t('services.timesheet.taskTracking')
			],
			invoicing: [
				$t('services.invoicing.contractManagement'),
				$t('services.invoicing.lateFees'),
				$t('services.invoicing.remittanceAdvice'),
				$t('services.invoicing.revisions'),
				$t('services.invoicing.creditMemos')
			]
		},
		{
			title: $t('pricing.license.title'),
			frequency: $t('pricing.license.frequency'),
			bestFor: $t('pricing.license.bestFor'),
			inclusions: $t('pricing.license.inclusions'),

			timesheets: {
				overtime: $t('services.timesheet.overtime'),
				liveReporting: $t('services.timesheets.liveReporting'),
				forecasting: $t('services.timesheets.forecasting')
			},
			invoicing: {
				forcastingTools: $t('services.invoicing.forecastingTools'),
				dunningNotices: $t('services.invoicing.dunningNotices'),
				disputeHandling: $t('services.invoicing.disputHandling')
			}
		},
		{
			title: $t('pricing.subscription.title'),
			frequency: $t('pricing.subscription.frequency'),
			bestFor: $t('pricing.subscription.bestFor'),
			inclusions: $t('pricing.subscriptions.inclusions'),

			timesheets: {
				teams: $t('teams'),
				scheduleGeneration: $t('services.timesheet.scheduleGeneration'),
				shiftApprovals: $t('services.timesheet.shiftApprovals'),
				textReminders: $t('services.timesheet.textReminders')
			},
			invoicing: {
				mailingInvoices: $t('services.invoicing.mailingInvoices')
			},
			ai: {}
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

			<!-- TODO: Scrap this, implement something more concise and smaller -->

			<!-- <div>
				<div class="text-md flex flex-col gap-2">
					<h3>TimeSheets</h3>
					{#if item.timesheets}
						{#each item.timesheets as feature}
							<p>{feature}</p>
						{/each}
					{/if}
				</div>
				<div>
					{#if item.invoicing}
						{#each item.invoicing as feature}
							<p>{feature}</p>
						{/each}
					{/if}
				</div>
			</div> -->
		</div>
	{/each}
{/snippet}

<section class="relative w-full py-16">
	<div class="mx-auto flex h-fit max-w-7xl justify-between gap-16">
		{@render PricingSnippet(pricing)}
	</div>
</section>
