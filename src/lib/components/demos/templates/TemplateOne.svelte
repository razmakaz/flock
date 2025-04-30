<script lang="ts">
	import { t } from '$lib/translations.svelte';

	const { mockData } = $props();

	console.log(mockData);
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
				<h1 class="m-0 text-2xl font-semibold">{mockData.companyName}</h1>
			</div>
		</div>
		<div class="text-shadow-sm text-4xl font-bold tracking-wide">{$t('invoice.title')}</div>
	</div>

	<!-- Invoice Details -->
	<div class="flex justify-between border-b border-gray-200 bg-gray-50 px-10 py-8">
		<div class="flex-1">
			<p class="mb-2 text-xs tracking-wide text-gray-500 uppercase">
				{$t('invoice.invoiceTo')}
			</p>
			<p class="m-0 mb-2 text-lg font-semibold text-blue-500">{mockData.client}</p>
			<p class="m-0 text-sm leading-relaxed text-gray-600">
				{mockData.address}
			</p>
		</div>
		<div class="flex-1 text-right">
			<div>
				<p class="m-0 text-xs text-gray-500">{$t('invoice.invoiceNumber')}</p>
				<p class="m-0 mb-2 text-base font-medium text-blue-500">{mockData.number}</p>
			</div>
			<div>
				<p class="m-0 text-xs text-gray-500">{$t('invoice.issueDate')}</p>
				<p class="m-0 mb-2 text-base font-medium text-blue-500">{mockData.issueDate}</p>
			</div>
			<div>
				<p class="m-0 text-xs text-gray-500">{$t('invoice.dueDate')}</p>
				<p class="m-0 text-base font-medium text-blue-500">{mockData.dueDate}</p>
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
						>{$t('invoice.service')}</th
					>
					<th
						class="w-[15%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{$t('invoice.rate')}</th
					>
					<th
						class="w-[15%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{$t('invoice.quantity')}</th
					>
					<th
						class="w-[20%] border-b-2 border-gray-200 bg-gray-50 px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
						>{$t('invoice.total')}</th
					>
				</tr>
			</thead>
			<tbody>
				{#each mockData.items as item, index (item.id)}
					<tr>
						<td class="border-b border-gray-200 px-4 py-4 text-left text-sm text-gray-600">
							{index + 1}
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-left text-gray-950">
							<input
								type="text"
								bind:value={item.title}
								class="w-full rounded border border-gray-300 px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600">
							<input
								type="number"
								bind:value={item.rate}
								step="0.001"
								min="0"
								class="no-spinners w-20 rounded border border-gray-300 px-2 py-1 text-right focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600">
							<input
								type="number"
								bind:value={item.quantity}
								step="0.001"
								min="0"
								class="no-spinners w-20 rounded border border-gray-300 px-2 py-1 text-right focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600">
							<input
								type="number"
								bind:value={item.tax}
								step="0.001"
								min="0"
								class="no-spinners w-16 rounded mr-2 border border-gray-300 px-2 py-1 text-right focus:ring-2 focus:ring-blue-500 focus:outline-none"
							/>%
						</td>
						<td class="border-b border-gray-200 px-4 py-4 text-right text-sm text-gray-600">
							{item.total.toFixed(2)}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Invoice Footer -->
	<div class="relative -mt-8 flex justify-between px-10 pb-10">
		<div class="w-1/2">
			<div class="mb-4 font-semibold text-blue-500">{$t('invoice.thankYou')}</div>

			<div class="mb-6">
				<div
					class="relative mb-2 pb-2 text-sm font-semibold text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 after:content-['']"
				>
					{$t('invoice.paymentDetails')}
				</div>
				<div class="text-sm text-gray-600">
					<p>
						<span class="mr-1 font-medium text-gray-800">{$t('invoice.bankName')}</span>
						{mockData.bank.bankName}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{$t('invoice.accountName')}</span>
						{mockData.bank.accountName}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{$t('invoice.accountNumber')}</span>
						{mockData.bank.accountNumber}
					</p>
					<p>
						<span class="mr-1 font-medium text-gray-800">{$t('invoice.routingNumber')}</span>
						{mockData.bank.routingNumber}
					</p>
				</div>
			</div>

			<div class="mb-6">
				<div
					class="relative mb-2 pb-2 text-sm font-semibold text-blue-500 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-10 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-400 after:content-['']"
				>
					{$t('invoice.termsTitle')}
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
						<td class="py-2 text-sm text-gray-600">{$t('invoice.subtotal')}</td>
						<td class="py-2 text-right text-sm font-medium text-gray-600">{mockData.subtotal}</td>
					</tr>
					<!-- <tr class="border-b border-gray-200">
						<td class="py-2 text-sm text-gray-600">{$t('invoice.tax')}</td>
						<td class="py-2 text-right text-sm font-medium text-gray-600">{mockData.tax}</td>
					</tr> -->
					<!-- {#if mockData.discount}
						<tr class="border-b border-gray-200">
							<td class="py-2 text-sm text-gray-600">{$t('invoice.discount')}</td>
							<td class="py-2 text-right text-sm font-medium text-gray-600"
								>{mockData.discount}</td
							>
						</tr>
					{/if} -->
					<tr class="border-t-2 border-gray-200">
						<td class="pt-4 text-lg font-semibold text-blue-500">{$t('invoice.totalAmount')}</td>
						<td class="pt-4 text-right text-lg font-semibold text-blue-500"
							>{mockData.totalAmount}</td
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
