import puppeteer from 'puppeteer';
import type { RequestHandler } from '@sveltejs/kit';
import { returnTemplateOne } from '$lib/templates/templateOne';
import { returnTemplateTwo } from '$lib/templates/templateTwo';

export const POST: RequestHandler = async ({ request }) => {
	try {
		// const customData: PDFData = await request.json();

		const browser = await puppeteer.launch({
			headless: false
		});

		const invoiceData = {
			companyName: 'Apex Design Co.',
			companyTagline: 'Innovative Solutions for Modern Brands',
			receiver: 'Jane Doe',
			address: '1234 Market Street\nSan Francisco, CA 94103\nUnited States',
			number: 'INV-2025-0012',
			issueDate: '2025-04-06',
			dueDate: '2025-04-20',
			items: [
				{
					name: 'Website Redesign',
					description: 'Full redesign of corporate website including UI/UX strategy.',
					rate: '$150.00',
					quantity: 10,
					total: '$1,500.00'
				},
				{
					name: 'SEO Optimization',
					description: 'Comprehensive keyword research and technical optimization.',
					rate: '$100.00',
					quantity: 5,
					total: '$500.00'
				},
				{
					name: 'Monthly Maintenance',
					description: 'Site backups, updates, and performance monitoring for April.',
					rate: '$75.00',
					quantity: 1,
					total: '$75.00'
				}
			],
			subtotal: '$2,075.00',
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

		// const htmlContent = await returnTemplateOne(invoiceData);

		// if (!htmlContent) return new Response(htmlContent, { status: 500 });

		// await page.setContent(htmlContent, {
		// 	waitUntil: 'networkidle0'
		// });
		const page = await browser.newPage();

		// You get this data string by using
		// btoa(JSON.stringify(customData))
		const data =
			'eyJjb21wYW55TmFtZSI6IkFwZXggRGVzaWduIENvLiIsImNvbXBhbnlUYWdsaW5lIjoiSW5ub3ZhdGl2ZSBTb2x1dGlvbnMgZm9yIE1vZGVybiBCcmFuZHMiLCJyZWNlaXZlciI6IkphbmUgRG9lIiwiYWRkcmVzcyI6IjEyMzQgTWFya2V0IFN0cmVldFxuU2FuIEZyYW5jaXNjbywgQ0EgOTQxMDNcblVuaXRlZCBTdGF0ZXMiLCJudW1iZXIiOiJJTlYtMjAyNS0wMDEyIiwiaXNzdWVEYXRlIjoiMjAyNS0wNC0wNiIsImR1ZURhdGUiOiIyMDI1LTA0LTIwIiwiaXRlbXMiOlt7Im5hbWUiOiJXZWJzaXRlIFJlZGVzaWduIiwiZGVzY3JpcHRpb24iOiJGdWxsIHJlZGVzaWduIG9mIGNvcnBvcmF0ZSB3ZWJzaXRlIGluY2x1ZGluZyBVSS9VWCBzdHJhdGVneS4iLCJzZXJ2aWNlRGF0ZSI6IjEyLzYvMTIiLCJyYXRlIjoiJDE1MC4wMCIsInF1YW50aXR5IjoxMCwidG90YWwiOiIkMSw1MDAuMDAifSx7Im5hbWUiOiJTRU8gT3B0aW1pemF0aW9uIiwiZGVzY3JpcHRpb24iOiJDb21wcmVoZW5zaXZlIGtleXdvcmQgcmVzZWFyY2ggYW5kIHRlY2huaWNhbCBvcHRpbWl6YXRpb24uIiwic2VydmljZURhdGUiOiIxMi82LzEyIiwicmF0ZSI6IiQxMDAuMDAiLCJxdWFudGl0eSI6NSwidG90YWwiOiIkNTAwLjAwIn0seyJuYW1lIjoiTW9udGhseSBNYWludGVuYW5jZSIsImRlc2NyaXB0aW9uIjoiU2l0ZSBiYWNrdXBzLCB1cGRhdGVzLCBhbmQgcGVyZm9ybWFuY2UgbW9uaXRvcmluZyBmb3IgQXByaWwuIiwic2VydmljZURhdGUiOiIxMi82LzEyIiwicmF0ZSI6IiQ3NS4wMCIsInF1YW50aXR5IjoxLCJ0b3RhbCI6IiQ3NS4wMCJ9XSwic3VidG90YWwiOiIkMiwwNzUuMDAiLCJ0YXhBbW91bnQiOiIkMTI0LjUwIiwiZGlzY291bnQiOiIkMTAwLjAwIiwidG90YWxBbW91bnQiOiIkMiwwOTkuNTAiLCJiYW5rIjp7ImJhbmtOYW1lIjoiRmlyc3QgTmF0aW9uYWwgQmFuayIsImFjY291bnROYW1lIjoiQXBleCBEZXNpZ24gQ28uIiwiYWNjb3VudE51bWJlciI6IjEyMzQ1Njc4OTAiLCJyb3V0aW5nTnVtYmVyIjoiOTg3NjU0MzIxIn19';
		const url = new URL(request.url + '/' + data);

		// Added noui parameter to remove the UI
		url.searchParams.set('noui', 'true');

		console.log(url.toString());

		await page.goto(url.toString());

		await page.setViewport({
			width: Math.round(8.5 * 96), // 8.5 inches in pixels (assuming 96 DPI)
			height: Math.round(11 * 96) // 11 inches in pixels (assuming 96 DPI)
		});

		const pdfBuffer = await page.pdf({
			format: 'Letter',
			printBackground: true
		});

		await browser.close();

		return new Response(pdfBuffer, {
			status: 200,
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment; filename="generated.pdf"'
			}
		});
	} catch (error) {
		console.error('PDF generation error:', error);
		return new Response(JSON.stringify({ error: 'Failed to generate PDF' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
