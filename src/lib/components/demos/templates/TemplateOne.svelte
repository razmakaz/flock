<script lang="ts">
	import { page } from '$app/stores';

	export let invoiceData: any;
	const { t, translate } = $page.data;
</script>

<div
	class="relative mx-auto h-[297mm] w-[210mm] overflow-hidden bg-white shadow-lg print:h-full print:w-full print:shadow-none"
>
	<!-- Header -->
	<div
		class="flex items-center justify-between bg-gradient-to-br from-blue-500 to-cyan-400 px-10 py-9 text-white"
	>
		<div class="flex items-center">
			<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white">
				<div class="clip-path-hexagon h-9 w-9 bg-gradient-to-br from-blue-500 to-cyan-400"></div>
			</div>
			<div>
				<h1 class="m-0 text-2xl font-semibold">{invoiceData.companyName}</h1>
				<p class="m-0 text-sm opacity-80">{invoiceData.companyTagline}</p>
			</div>
		</div>
		<div class="text-shadow-sm text-4xl font-bold tracking-wide">{translate('invoice.title')}</div>
	</div>

	<!-- Invoice Details -->
	<div class="flex justify-between border-b border-gray-200 bg-gray-50 px-10 py-8">
		<div class="flex-1">
			<p class="mb-2 text-xs tracking-wide text-gray-500 uppercase">
				{translate('invoice.invoiceTo')}
			</p>
			<p class="m-0 mb-2 text-lg font-semibold text-blue-500">{invoiceData.receiver}</p>
			<p class="m-0 text-sm leading-relaxed text-gray-600">
				{invoiceData.address}
			</p>
		</div>
		<div class="flex-1 text-right">
			<div>
				<p class="m-0 text-xs text-gray-500">{translate('invoice.invoiceNumber')}</p>
				<p class="m-0 mb-2 text-base font-medium text-blue-500">{invoiceData.number}</p>
			</div>
			<div>
				<p class="m-0 text-xs text-gray-500">{translate('invoice.issueDate')}</p>
				<p class="m-0 mb-2 text-base font-medium text-blue-500">{invoiceData.issueDate}</p>
			</div>
			<div>
				<p class="m-0 text-xs text-gray-500">{translate('invoice.dueDate')}</p>
				<p class="m-0 text-base font-medium text-blue-500">{invoiceData.dueDate}</p>
			</div>
		</div>
	</div>

	<!-- Invoice Body -->
	<div class="min-h-[40%] px-10 py-8">
		<table class="mb-8 w-full border-collapse">
			<thead>
				<tr>
					<th
						class="w-[5%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>#</th
					>
					<th
						class="w-[45%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{translate('invoice.service')}</th
					>
					<th
						class="w-[15%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{translate('invoice.rate')}</th
					>
					<th
						class="w-[15%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{translate('invoice.quantity')}</th
					>
					<th
						class="w-[20%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{translate('invoice.total')}</th
					>
				</tr>
			</thead>
			<tbody>
				{#each invoiceData.items as item, index}
					<tr>
						<td class="border-b border-gray-200 px-4 py-4 text-left text-sm text-gray-600"
							>{index}</td
						>
						<td class="border-b border-gray-200 px-4 py-4 text-left">
							<div class="font-medium text-gray-800">{item.name}</div>
							<div class="mt-1 text-xs text-gray-500">
								<p>{item.description}</p>
							</div>
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600"
							>{item.rate}</td
						>
						<td class="border-b border-gray-200 px-4 py-4 text-center text-sm text-gray-600"
							>{item.quantity}</td
						>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600"
							>{item.total}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Invoice Footer -->
	<div class="relative -mt-8 flex justify-between px-10 pb-10">
		<div class="w-1/2">
			<div class="mb-4 font-semibold text-blue-500">{translate('invoice.thankYou')}</div>

			<div class="mb-6">
				<div
					class="relative mb-2 pb-2 text-sm font-semibold text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 after:content-['']"
				>
					{translate('invoice.paymentDetails')}
				</div>
				<div class="text-sm text-gray-600">
					<p>
						<span class="mr-1 font-medium text-gray-800">{translate('invoice.bankName')}</span>
						{invoiceData.bank.bankName}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{translate('invoice.accountName')}</span>
						{invoiceData.bank.accountName}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{translate('invoice.accountNumber')}</span>
						{invoiceData.bank.accountNumber}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{translate('invoice.routingNumber')}</span>
						{invoiceData.bank.routingNumber}
					</p>
				</div>
			</div>

			<div class="mb-6">
				<div
					class="relative mb-2 pb-2 text-sm font-semibold text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 after:content-['']"
				>
					{translate('invoice.termsTitle')}
				</div>
				<div class="text-xs leading-relaxed text-gray-500">
					Payment is due within 14 days of invoice date. Please include the invoice number with your
					payment. Late payments are subject to a 5% monthly fee. For questions regarding this
					invoice, please contact our accounting department at accounting@apexdesign.com.
				</div>
			</div>
		</div>

		<div class="w-2/5">
			<table class="mb-4 w-full border-collapse">
				<tbody>
					<tr class="border-b border-gray-200">
						<td class="py-2 text-sm text-gray-600">{translate('invoice.subtotal')}</td>
						<td class="py-2 text-right text-sm font-medium text-gray-600">{invoiceData.subtotal}</td
						>
					</tr>
					<tr class="border-b border-gray-200">
						<td class="py-2 text-sm text-gray-600">{translate('invoice.tax')}</td>
						<td class="py-2 text-right text-sm font-medium text-gray-600"
							>{invoiceData.taxAmount}</td
						>
					</tr>
					{#if invoiceData.discount}
						<tr class="border-b border-gray-200">
							<td class="py-2 text-sm text-gray-600">{translate('invoice.discount')}</td>
							<td class="py-2 text-right text-sm font-medium text-gray-600"
								>{invoiceData.discount}</td
							>
						</tr>
					{/if}
					<tr class="border-t-2 border-gray-200">
						<td class="pt-4 text-lg font-semibold text-blue-500"
							>{translate('invoice.totalAmount')}</td
						>
						<td class="pt-4 text-right text-lg font-semibold text-blue-500"
							>{invoiceData.totalAmount}</td
						>
					</tr>
				</tbody>
			</table>

			<div class="mt-10 text-right">
				<div class="mb-2 ml-[30%] w-[70%] border-b border-gray-200"></div>
				<div class="text-sm font-medium text-gray-600">Authorized Signature</div>
			</div>
		</div>
	</div>
</div>

<style>
	.clip-path-hexagon {
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
	}

	@media print {
		body {
			@apply bg-white;
		}
	}
</style>
