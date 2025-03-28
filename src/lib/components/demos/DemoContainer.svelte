<script>
	import { t } from '$lib/translations.svelte';
	import InvoicingDemo from './InvoicingDemo.svelte';
	import TimesheetsDemo from './TimesheetsDemo.svelte';

	let state = $state({
		activeItem: 'timesheets'
	});

	const genItems = () => {
		return [
			{ id: 'timesheets', label: $t('demos.tabs.timesheets'), component: TimesheetsDemo },
			{ id: 'invoicing', label: $t('demos.tabs.invoicing'), component: InvoicingDemo }
		];
	};

	let items = $state(genItems());

	$effect(() => {
		items = genItems();
	});
</script>

<div class="mockup-browser border-base-300 bg-base-100 w-full border" style="min-width: 90vw;">
	<div class="mockup-browser-toolbar">
		<div class="input">https://www.flocit.app</div>
	</div>
	<div class="grid grid-cols-[1fr_auto_1fr]">
		<div class="border-base-300 flex justify-center border-b"></div>
		<div role="tablist" class="tabs tabs-lift">
			{#each items as item}
				<button
					role="tab"
					class="tab {state.activeItem === item.id ? 'tab-active' : ''}"
					onclick={() => (state.activeItem = item.id)}
				>
					{item.label}
				</button>
			{/each}
		</div>
		<div class="border-base-300 flex justify-center border-b"></div>
	</div>
	<div class="mockup-browser-window">
		{#each items as item}
			{#if state.activeItem === item.id}
				<item.component />
			{/if}
		{/each}
	</div>
</div>
