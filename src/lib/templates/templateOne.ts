import { get } from 'svelte/store';
import { t } from '$lib/translations.svelte';

export const returnTemplateOne = async (invoiceData: any) => {
	const translate = get(t);

	return `
<html>
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<style>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.invoice-container {
  width: 210mm; /* A4 width */
  height: 297mm; /* A4 height */
  background: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}

@media print {
  body {
    background-color: white;
  }
  .invoice-container {
    width: 100%;
    height: 100%;
    box-shadow: none;
    margin: 0;
    padding: 0;
  }
}

.invoice-header {
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  padding: 35px 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.branding {
  display: flex;
  align-items: center;
}

.logo {
  width: 48px;
  height: 48px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.logo-inner {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #3a7bd5, #00d2ff);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.company-info h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.company-info p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.invoice-title {
  font-size: 36px;
  letter-spacing: 2px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invoice-details {
  background-color: #f9fbfd;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eaedf2;
}

.client-info,
.invoice-info {
  flex: 1;
}

.invoice-info {
  text-align: right;
}

.section-title {
  font-size: 14px;
  text-transform: uppercase;
  color: #8c98a4;
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.client-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #3a7bd5;
}

.address {
  font-size: 14px;
  line-height: 1.6;
  color: #677788;
  margin: 0;
}

.detail-label {
  font-size: 14px;
  color: #8c98a4;
  margin: 0;
}

.detail-value {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 10px 0;
  color: #3a7bd5;
}

.invoice-body {
  padding: 30px 40px;
  min-height: 40%; /* Ensure content takes minimum space */
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.invoice-table th {
  background-color: #f9fbfd;
  padding: 12px 15px;
  text-align: left;
  font-weight: 500;
  color: #8c98a4;
  font-size: 14px;
  border-bottom: 2px solid #eaedf2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.invoice-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eaedf2;
  color: #677788;
  font-size: 15px;
}

.invoice-table tr:last-child td {
  border-bottom: none;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-description {
  font-size: 13px;
  margin-top: 5px;
  color: #8c98a4;
}

.invoice-table .text-right {
  text-align: right;
}

.invoice-table .text-center {
  text-align: center;
}

.invoice-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 40px 40px;
  position: relative;
  margin-top: -30px;
}

.left-footer {
  width: 50%;
}

.right-footer {
  width: 40%;
}

.thank-you {
  font-size: 16px;
  color: #3a7bd5;
  font-weight: 600;
  margin-bottom: 15px;
}

.footer-section {
  margin-bottom: 25px;
}

.footer-title {
  font-size: 14px;
  color: #3a7bd5;
  font-weight: 600;
  margin-bottom: 10px;
  position: relative;
  padding-bottom: 8px;
}

.footer-title:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #3a7bd5, #00d2ff);
}

.payment-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #677788;
}

.payment-details span {
  font-weight: 500;
  color: #333;
  margin-right: 5px;
}

.terms-text {
  font-size: 13px;
  color: #8c98a4;
  line-height: 1.6;
}

.totals-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.totals-table tr {
  border-bottom: 1px solid #eaedf2;
}

.totals-table tr:last-child {
  border-bottom: none;
  border-top: 2px solid #eaedf2;
}

.totals-table td {
  padding: 8px 0;
  font-size: 14px;
  color: #677788;
}

.totals-table td:last-child {
  text-align: right;
  font-weight: 500;
}

.totals-table tr:last-child td {
  padding-top: 15px;
  font-size: 18px;
  color: #3a7bd5;
  font-weight: 600;
}

.signature {
  margin-top: 40px;
  text-align: right;
}

.signature-line {
  width: 70%;
  margin-left: 30%;
  border-bottom: 1px solid #eaedf2;
  margin-bottom: 8px;
}

.signature-text {
  font-size: 14px;
  color: #677788;
  font-weight: 500;
}

		</style>
	</head>
	<body>
		<div class="invoice-container">
			<!-- Header -->
			<div class="invoice-header">
				<div class="branding">
					<div class="logo">
						<div class="logo-inner"></div>
					</div>
					<div class="company-info">
						<h1>${invoiceData.companyName}</h1>
						<p>${invoiceData.companyTagline}</p>
					</div>
				</div>
				<div class="invoice-title">${translate('invoice.title')}</div>
			</div>

			<!-- Invoice Details -->
			<div class="invoice-details">
				<div class="client-info">
					<p class="section-title">${translate('invoice.invoiceTo')}</p>
					<p class="client-name">${invoiceData.receiver}</p>
					<p class="address">
						${invoiceData.address}
					</p>
				</div>
				<div class="invoice-info">
					<div>
						<p class="detail-label">${translate('invoice.invoiceNumber')}</p>
						<p class="detail-value">${invoiceData.number}</p>
					</div>
					<div>
						<p class="detail-label">${translate('invoice.issueDate')}</p>
						<p class="detail-value">${invoiceData.issueDate}</p>
					</div>
					<div>
						<p class="detail-label">${translate('invoice.dueDate')}</p>
						<p class="detail-value">${invoiceData.dueDate}</p>
					</div>
				</div>
			</div>

			<!-- Invoice Body -->
			<div class="invoice-body">
				<table class="invoice-table">
					<thead>
						<tr>
							<th style="width: 5%">#</th>
							<th style="width: 45%">${translate('invoice.service')}</th>
              <th style="width: 15%" class="text-right">${translate('invoice.serviceDate')}</th>
							<th style="width: 15%" class="text-right">${translate('invoice.rate')}</th>
							<th style="width: 15%" class="text-center">${translate('invoice.quantity')}</th>
							<th style="width: 20%" class="text-right">${translate('invoice.total')}</th>
						</tr>
					</thead>
					<tbody>
						${invoiceData.items.map(
							(item: any, index: number) => `
						<tr>
							<td>${index}</td>
							<td>
								<div class="item-name">${item.name}</div>
								<div class="item-description">
									<p>${item.description}</p>
								</div>
							</td>
              <td class="text-right">${item.serviceDate}</td>
							<td class="text-right">${item.rate}</td>
							<td class="text-center">${item.quantity}</td>
							<td class="text-right">${item.total}</td>
						</tr>
						`
						)}

					</tbody>
				</table>
			</div>

			<!-- Invoice Footer -->
			<div class="invoice-footer">
				<div class="left-footer">
					<div class="thank-you">${translate('invoice.thankYou')}</div>

					<div class="footer-section">
						<div class="footer-title">${translate('invoice.paymentDetails')}</div>
						<div class="payment-details">
							<p><span>${translate('invoice.bankName')}</span> ${invoiceData.bank.bankName}</p>
							<p><span>${translate('invoice.accountName')}</span> ${invoiceData.bank.accountName}</p>
							<p><span>${translate('invoice.accountNumber')}</span> ${invoiceData.bank.accountNumber}</p>
							<p><span>${translate('invoice.routingNumber')}</span> ${invoiceData.bank.routingNumber}</p>
						</div>
					</div>

					<div class="footer-section">
						<div class="footer-title">${translate('invoice.termsTitle')}</div>
						<div class="terms-text">
							Payment is due within 14 days of invoice date. Please include the invoice number with
							your payment. Late payments are subject to a 5% monthly fee. For questions regarding
							this invoice, please contact our accounting department at accounting@apexdesign.com.
						</div>
					</div>
				</div>

				<div class="right-footer">
					<table class="totals-table">
						<tbody>
							<tr>
								<td>${translate('invoice.subtotal')}</td>
								<td>${invoiceData.subtotal}</td>
							</tr>
							<tr>
								<td>${translate('invoice.tax')}</td>
								<td>${invoiceData.taxAmount}</td>
							</tr>
							${
								invoiceData.discount &&
								`
							<tr>
								<td>${translate('invoice.discount')}</td>
								<td>${invoiceData.discount}</td>
							</tr>
							`
							}

							<tr>
								<td>${translate('invoice.totalAmount')}</td>
								<td>${invoiceData.totalAmount}</td>
							</tr>
						</tbody>
					</table>

					<div class="signature">
						<div class="signature-line"></div>
						<div class="signature-text">Authorized Signature</div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
`;
};
