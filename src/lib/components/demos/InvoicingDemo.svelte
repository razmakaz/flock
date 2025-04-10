<script lang="ts">
	import type { IInvoiceData, IInvoiceLineData } from '$lib/@types/IInvoice';
	import InvoiceTools from '$lib/tools/InvoiceTools';
	import { onMount } from 'svelte';

	let timesheetData: IInvoiceLineData[] | undefined = $state([]);

	let mockData: IInvoiceData = $state({
		companyName: 'Apex Design Co.',
		client: 'Jane Doe',
		address: '1234 Market Street\nSan Francisco, CA 94103\nUnited States',
		number: 'INV-2025-0012',
		issueDate: '2025-04-06',
		dueDate: '2025-04-20',
		items: [],
		subtotal: '',
		totalAmount: '',
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

	const getTimesheetData = () => {
		const timeDemoData = localStorage.getItem('floc-cal-demo');
		if (!timeDemoData) {
			return;
		}
		const parsedTimeData = JSON.parse(timeDemoData);
		timesheetData = parsedTimeData;
		return;
	};

	const recalcLine = (id: string, value: number) => {
		const itemIndex = mockData.items.findIndex((item) => item.id === id);

		if (itemIndex !== -1) {
			mockData.items[itemIndex].rate = value;
			const newItem = InvoiceTools.genDemoLineData(mockData.items[itemIndex]);

			console.log('New item for invoice data:', newItem);

			if (!newItem) return;
			mockData.items[itemIndex] = newItem;
		}
	};

	const handleChange = (id: string, e: Event) => {
		const target = e.target as HTMLInputElement;
		const value = Number(target.value);
		console.log(value);

		recalcLine(id, value);
	};

	onMount(() => {
		getTimesheetData();

		if (!timesheetData) return;

		timesheetData.forEach((time) => {
			const itemData = InvoiceTools.genDemoLineData(time);
			mockData.items = [...mockData.items, itemData];
		});

		mockData.items.forEach((item) => {
			const subtotal = InvoiceTools.calcSubtotal(item);
			mockData.subtotal += subtotal;
		});
	});

	// make invoice as component

	// invoice themes
</script>

<div class="mx-auto flex h-fit w-full justify-center">
	<div class="flex h-fit w-full max-w-7xl flex-col gap-8 p-4 md:gap-4">
		<h2 class="text-center text-3xl md:text-left">Invoice Demo</h2>

		<div class="flex flex-col justify-between gap-8 md:flex-row">
			<div class="text-xl">
				<h3 class="text-2xl">For testing</h3>
				<p>{mockData.companyName}</p>
				<p>{mockData.client}</p>
				<p>{mockData.address}</p>
				<p>{mockData.number}</p>
				<p>{mockData.issueDate}</p>
				<p>{mockData.dueDate}</p>

				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									ID
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Title
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Date
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Rate
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Tax
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Quantity
								</th>
								<th
									scope="col"
									class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
								>
									Total
								</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each mockData.items as item (item.id)}
								<tr class="hover:bg-gray-50">
									<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
										{item.id}
									</td>
									<td class="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
										{item.title}
									</td>
									<td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
										{item.date}
									</td>
									<td class="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
										<input
											type="text"
											defaultValue={item.rate ? item.rate : ''}
											class="w-24"
											oninput={(e) => handleChange(item.id, e)}
										/>
									</td>
									<td class="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
										{item.tax}%
									</td>
									<td class="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
										{item.quantity}
									</td>
									<td class="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
										{item.total}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div class="flex flex-col">
					<p>{mockData.subtotal}</p>
					<p>{mockData.totalAmount}</p>
				</div>

				<p>{mockData.bank.bankName}</p>
				<p>{mockData.bank.accountName}</p>
				<p>{mockData.bank.accountNumber}</p>
				<p>{mockData.bank.routingNumber}</p>
			</div>
		</div>
	</div>
</div>
