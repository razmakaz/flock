import { t } from '$lib/translations.svelte';
import { get } from 'svelte/store';

export const returnTemplateTwo = async (invoiceData: any) => {
	const translate = get(t);

	return `
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Purple Modern Invoice Template</title>
    <style>
body {
  font-family: "Segoe UI", Arial, sans-serif;
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
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
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

.header {
  position: relative;
  height: 100px;
  display: flex;
  overflow: hidden;
}

.grey-section {
  background-color: #e9e9e9;
  width: 65%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  padding: 25px;
  display: flex;
  align-items: center;
}

.dark-section {
  background-color: #2d313a;
  width: 45%;
  height: 100%;
  position: absolute;
  right: 0;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
}

.logo-area {
  display: flex;
  align-items: center;
}

.logo {
  width: 36px;
  height: 36px;
  background-color: #2d313a;
  clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-inner {
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 2px solid #e9e9e9;
  clip-path: polygon(
    50% 0%,
    100% 25%,
    100% 75%,
    50% 100%,
    0% 75%,
    0% 25%
  );
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-weight: bold;
  font-size: 16px;
  margin: 0;
}

.tagline {
  font-size: 10px;
  color: #555;
  margin: 0;
}

.invoice-info-bar {
  background-color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
}

.purple-accent {
  background-color: #b15ac7;
  position: absolute;
  right: 0;
  top: 0;
  width: 33%;
  height: 100%;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 25px 0 50px;
}

.invoice-to {
  width: 45%;
}

.invoice-to h3 {
  margin: 0 0 10px 0;
  font-weight: normal;
}

.client-name {
  font-weight: bold;
  font-size: 18px;
  margin: 0 0 5px 0;
}

.address {
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  margin: 0;
}

.invoice-details {
  display: flex;
  justify-content: space-between;
  width: 40%;
  position: relative;
  z-index: 10;
}

.invoice-details-right {
  text-align: right;
  color: black;
}

.detail-title {
  color: white;
  margin: 0 0 5px 0;
  font-weight: normal;
  font-size: 14px;
}

.detail-value {
  margin: 0;
  font-weight: normal;
  font-size: 16px;
}

.invoice-content {
  padding: 30px 25px;
  min-height: 55%; /* Ensure content takes up space */
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
}

.invoice-table th {
  padding: 15px 20px;
  text-align: left;
  font-weight: normal;
  border-bottom: 1px solid #ddd;
}

.invoice-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.invoice-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

.thank-you {
  font-weight: bold;
  margin-bottom: 20px;
}

.payment-info {
  width: 30%;
  float: left;
  margin-top: 20px;
}

.payment-title {
  color: #b15ac7;
  font-weight: bold;
  margin-bottom: 10px;
}

.payment-details p {
  margin: 5px 0;
  font-size: 14px;
}

.payment-details span {
  font-weight: bold;
}

.totals {
  width: 30%;
  float: right;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.total-row.final {
  color: #b15ac7;
  font-weight: bold;
  font-size: 18px;
  border-bottom: none;
  margin-top: 5px;
}

.terms {
  clear: both;
  padding-top: 20px;
  margin-top: 40px;
  border-top: 1px solid #ddd;
}

.terms-title {
  color: #b15ac7;
  font-weight: bold;
  margin-bottom: 10px;
}

.terms-text {
  font-size: 12px;
  color: #777;
  line-height: 1.5;
  margin-bottom: 20px;
}

.signature {
  float: right;
  width: 200px;
  text-align: center;
  margin-bottom: 10px;
}

.signature-line {
  width: 100%;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.signature-text {
  font-weight: bold;
  text-align: center;
}

.footer {
  clear: both;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  overflow: hidden;
}

.footer-purple {
  background-color: #b15ac7;
  height: 100%;
  width: 33%;
  position: absolute;
  left: 0;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}

.footer-dark {
  background-color: #2d313a;
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
}
    </style>
  </head>
  <body>
    <div class="invoice-container">
      <!-- Header -->
      <div class="header">
        <div class="grey-section">
          <div class="logo-area">
            <div class="logo">
              <div class="logo-inner"></div>
            </div>
            <div class="brand-text">
              <p class="brand-name">${invoiceData.companyName}</p>
              <p class="tagline">${invoiceData.companyTagline}</p>
            </div>
          </div>
        </div>
        <div class="dark-section">${translate('invoice.title')}</div>
      </div>

      <!-- Invoice Info Bar -->
      <div class="invoice-info-bar">
        <div class="invoice-to">
          <h3>${translate('invoice.invoiceTo')}:</h3>
          <p class="client-name">${invoiceData.receiver}</p>
          <p class="address">
                ${invoiceData.address}
          </p>
        </div>
        <div class="invoice-details">

          <!-- This will be overlapped by the purple section -->
        </div>
        <div class="purple-accent">
          <div>
            <p class="detail-title">${translate('invoice.invoiceNumber')}</p>
            <p class="detail-value">${invoiceData.number}</p>
          </div>
          <div class="invoice-details-right">
            <p class="detail-title">${translate('invoice.issueDate')}</p>
            <p class="detail-value">${invoiceData.issueDate}</p>
          </div>
        </div>
      </div>

      <!-- Invoice Content -->
      <div class="invoice-content">
        <table class="invoice-table">
          <thead>
            <tr>
              <th>#</th>
              <th>${translate('invoice.service')}</th>
              <th>${translate('invoice.rate')}</th>
              <th>${translate('invoice.quantity')}</th>
              <th>${translate('invoice.total')}</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items.map(
							(item, index) => `
                <tr>
                    <td>${index}</td>
                    <td>${item.name}</td>
                    <td>${item.rate}</td>
                    <td>${item.quantity}</td>
                    <td>${item.total}</td>
                </tr>
                `
						)}

          </tbody>
        </table>

        <div class="thank-you">${translate('invoice.thankYou')}</div>

        <div class="payment-info">
          <div class="payment-title">${translate('invoice.paymentDetails')}:</div>
          <div class="payment-details">
							<p><span>${translate('invoice.bankName')}</span> ${invoiceData.bank.bankName}</p>
							<p><span>${translate('invoice.accountName')}</span> ${invoiceData.bank.accountName}</p>
							<p><span>${translate('invoice.accountNumber')}</span> ${invoiceData.bank.accountNumber}</p>
							<p><span>${translate('invoice.routingNumber')}</span> ${invoiceData.bank.routingNumber}</p>
          </div>
        </div>

        <div class="totals">
          <div class="total-row">
            <div>${translate('invoice.subtotal')}:</div>
            <div>${invoiceData.subtotal}</div>
          </div>
          <div class="total-row">
            <div>${translate('invoice.tax')}:</div>
            <div>${invoiceData.taxAmount}</div>
          </div>
			${
				invoiceData.discount &&
				`
               <div class="total-row">
                	<div>${translate('invoice.discount')}:</div>
					<div>${invoiceData.discount}</div>
               </div>
                `
			}
          <div class="total-row final">
            <div>${translate('invoice.totalAmount')}:</div>
            <div>${invoiceData.totalAmount}</div>
          </div>
        </div>

        <div class="terms">
          <div class="terms-title">${translate('invoice.termsTitle')}</div>
          <div class="terms-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            efficitur tempor pesque non. Pellentesque viverra nulla in vehicula
            mattis. Nullam porta et nunc consectetur masuada fames. Lorem ipsum
            dolor sit amet, tempor pesque non.
          </div>

          <div class="signature">
            <div class="signature-line"></div>
            <div class="signature-text">${translate('invoice.authorizedSign')}</div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <div class="footer-purple"></div>
        <div class="footer-dark"></div>
      </div>
    </div>
  </body>
</html>
`;
};
