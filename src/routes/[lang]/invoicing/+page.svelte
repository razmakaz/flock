<script>
	import { onMount } from 'svelte';

	// make mock data to render out an invoice from data

	const mockData = {
		// get company name for organization collection
		companyName: 'Apex Design Co.',

		// get receiver and address from address collection
		receiver: 'Jane Doe',
		address: '1234 Market Street\nSan Francisco, CA 94103\nUnited States',

		// auto generate invoice number
		number: 'INV-2025-0012',

		// user sets the issue date and due date
		issueDate: '2025-04-06',
		dueDate: '2025-04-20',

		// run a single api call when the invoice is generated, pass in each of the line items
		// and apply the tax
		items: [
			{
				name: 'Website Redesign',
				serviceDate: '12/6/12',
				rate: '$150.00',
				taxRate: '',
				quantity: 10,
				total: '$1,500.00'
			},
			{
				name: 'SEO Optimization',
				serviceDate: '12/6/12',
				rate: '$100.00',
				taxRate: '',
				quantity: 5,
				total: '$500.00'
			},
			{
				name: 'Monthly Maintenance',
				serviceDate: '12/6/12',
				rate: '$75.00',
				taxRate: '',
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
		totalAmount: '$2,099.50',

		// automatically import bank info from the organization
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
		totalAmount: '',
		bank: {
			bankName: '',
			accountName: '',
			accountNumber: '',
			routingNumber: ''
		}
	});

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

<main></main>
