<script lang="ts">
	import { onMount } from 'svelte';

	// make mock data to render out an invoice from data

	const mockData = {
		companyName: 'Apex Design Co.',

		// get receiver and address from address collection
		receiver: 'Jane Doe',
		address: '1234 Market Street\nSan Francisco, CA 94103\nUnited States',

		// auto generate invoice number
		number: 'INV-2025-0012',
		issueDate: '2025-04-06',
		dueDate: '2025-04-20',
		items: [
			{
				name: 'Website Redesign',
				description: 'Full redesign of corporate website including UI/UX strategy.',
				serviceDate: '12/6/12',
				rate: '$150.00',
				quantity: 10,
				total: '$1,500.00'
			},
			{
				name: 'SEO Optimization',
				description: 'Comprehensive keyword research and technical optimization.',
				serviceDate: '12/6/12',
				rate: '$100.00',
				quantity: 5,
				total: '$500.00'
			},
			{
				name: 'Monthly Maintenance',
				description: 'Site backups, updates, and performance monitoring for April.',
				serviceDate: '12/6/12',
				rate: '$75.00',
				quantity: 1,
				total: '$75.00'
			}
		],
		subtotal: '$2,075.00',
		// give location to be taxed from (client location)
		// give the tax code of each item (user provided)
		// the amount that item costs (each item)
		// provide via api for taxjar, taxjar returns the amount of tax per item

		// nexus location would be the location of the user that is billing

		// use amount to collect
		taxAmount: '$124.50',
		discount: '$100.00',
		totalAmount: '$2,099.50',
		bank: {
			bankName: 'First National Bank',
			accountName: 'Apex Design Co.',
			accountNumber: '1234567890',
			routingNumber: '987654321'
		}
	};

	// give dropdown of styles of invoice

	// include invoice statement

	// include timesheet data

	// include type (invoice or credit memo)

	// toggle for show sales tax

	// toggle for showing remittance advice

	// take timesheet data from timesheet demo and use it in the invoice

	let timesheetData = $state();

	let invoiceData = $state({
		companyName: '',
		receiver: '',
		address: '',
		number: '',
		issueDate: '',
		dueDate: '',
		items: [],
		subtotal: '',
		taxAmount: '',
		discount: '',
		totalAmount: '',
		bank: {
			bankName: '',
			accountName: '',
			accountNumber: '',
			routingNumber: ''
		}
	});

	let subtotal = $state();
	let taxPercentage = $state();
	let total = $state();

	const getTimesheetData = () => {
		timesheetData = localStorage.getItem('floc-cal-demo');
		timesheetData = JSON.parse(timesheetData);

		const timedate = timesheetData[0].start;
		const date = new Date(timedate);
		console.log(date.toLocaleDateString());

		const diff = getHourDifference(timesheetData[0].start, timesheetData[0].end);
		console.log('Difference in time', diff);
		console.log(timesheetData);
	};

	// use this function to take the end time and use it for the service date
	function getHourDifference(startTime: string, endTime: string) {
		const startDate = new Date(startTime);
		const endDate = new Date(endTime);

		const diffInMs = Math.abs(endDate - startDate);

		// convert milliseconds to hours
		const diffInHours = diffInMs / (1000 * 60 * 60);

		return diffInHours;
	}

	// create an invoice id
	const genInvoiceNum = () => {
		const date = new Date();
	};

	const calulateTotals = () => {
		timesheetData.forEach((timesheet) => {
			const totalHours = getHourDifference(timesheet.start, timesheet.end);
		});
	};

	onMount(() => {
		getTimesheetData();
	});

	// make invoice as component

	// invoice themes
</script>

<div class="mx-auto flex h-fit w-full justify-center">
	<div class="flex w-full max-w-7xl flex-col gap-8 p-4 md:gap-4">
		<h2 class="text-center text-3xl md:text-left">Invoice Demo</h2>

		<div class="text-primary-content w-full border-2">
			<div class="flex flex-col">
				<label for="companyName" class="text-base-content">Company Name</label>
				<input type="text" name="companyName" />
			</div>
			<div class="flex flex-col">
				<label for="receiver" class="text-base-content"
					>Receiver <span class="text-error">*</span></label
				>
				<input type="text" name="receiver" />
			</div>
			<div class="flex flex-col">
				<label for="receiver" class="text-base-content"
					>Receiver Address <span class="text-error">*</span></label
				>
				<input type="text" name="receiver" />
			</div>
			<div class="flex flex-col">
				<label for="issueDate" class="text-base-content"
					>Issue Date <span class="text-error">*</span></label
				>
				<input type="date" name="issueDate" />
			</div>
			<div class="flex flex-col">
				<label for="dueDate" class="text-base-content"
					>Due Date <span class="text-error">*</span></label
				>
				<input type="date" name="dueDate" />
			</div>
		</div>
	</div>
</div>
