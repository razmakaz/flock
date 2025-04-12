<script lang="ts">
	import type { IInvoiceData, IInvoiceLineData } from '$lib/@types/IInvoice';
	import DemoInvoiceTools from '$lib/tools/DemoInvoiceTools';
	import { onMount } from 'svelte';
	import TemplateOne from './templates/TemplateOne.svelte';

	let timesheetData: IInvoiceLineData[] | undefined = $state([]);

	let mockData: IInvoiceData = $state({
		companyName: 'Apex Design Co.',
		client: 'Jane Doe',
		address: '1234 Market Street\nSan Francisco, CA 94103\nUnited States',
		number: 'INV-2025-0012',
		issueDate: '2025-04-06',
		dueDate: '2025-04-20',
		items: [],
		subtotal: 0,
		totalAmount: 0,
		bank: {
			bankName: 'First National Bank',
			accountName: 'Apex Design Co.',
			accountNumber: '1234567890',
			routingNumber: '987654321'
		}
	});
	// give dropdown of styles of invoice

	// include invoice statement

	// include timesheet data

	// include type (invoice or credit memo)

	// toggle for show sales tax

	// toggle for showing remittance advice

	// take timesheet data from timesheet demo and use it in the invoice

	/**
	 *
	 * @returns Takes mock data totals and recalculates them based on new item info
	 */
	const updateMockTotals = () => {
		mockData.subtotal = 0;
		mockData.totalAmount = 0;
		mockData.items.forEach((item) => {
			const subtotal = DemoInvoiceTools.calcSubtotal(item);
			if (subtotal) {
				mockData.subtotal += subtotal;
			}
			mockData.totalAmount += item.total;
		});
	};

	/**
	 * @returns Time sheet data from local storage
	 */
	const getTimesheetData = () => {
		const timeDemoData = localStorage.getItem('floc-cal-demo');
		if (!timeDemoData) {
			return;
		}
		const parsedTimeData = JSON.parse(timeDemoData);
		timesheetData = parsedTimeData;
		return;
	};

	/**
	 * @param id
	 * @param value
	 * @returns Recalculates demo line and based on new rate input and recalculates new mock data totals
	 */
	const recalcLine = (id: string, value: number) => {
		const itemIndex = mockData.items.findIndex((item) => item.id === id);

		if (itemIndex !== -1) {
			mockData.items[itemIndex].rate = value;
			const newItem = DemoInvoiceTools.genDemoLineData(mockData.items[itemIndex]);

			console.log('New item for invoice data:', newItem);

			if (!newItem) return;
			mockData.items[itemIndex] = newItem;
		}
		updateMockTotals();
	};

	const handleChange = (id: string, e: Event) => {
		const target = e.target as HTMLInputElement;
		const value = Number(target.value);
		recalcLine(id, value);
	};

	onMount(() => {
		getTimesheetData();

		if (!timesheetData) return;

		const newItems = timesheetData.map((time) => DemoInvoiceTools.genDemoLineData(time));
		mockData = {
			...mockData,
			items: [...mockData.items, ...newItems]
		};

		updateMockTotals();
	});

	// make invoice as component

	// invoice themes
</script>

<div class="mx-auto flex h-fit w-full justify-center">
	<div class="flex h-fit w-full max-w-7xl flex-col gap-8 p-4 md:gap-4">
		<h2 class="text-center text-3xl md:text-left">Invoice Demo</h2>

		{#if mockData}
			<div>
				<TemplateOne invoiceData={mockData} />
			</div>
		{/if}
	</div>
</div>
