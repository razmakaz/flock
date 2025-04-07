import puppeteer from 'puppeteer';
import type { RequestHandler } from '@sveltejs/kit';
import { returnMinimal } from '../templates/minimal';

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

		const page = await browser.newPage();

		const htmlContent = await returnMinimal(invoiceData);

		if (!htmlContent) return new Response(htmlContent, { status: 500 });

		await page.setContent(htmlContent, {
			waitUntil: 'networkidle0'
		});

		const pdfBuffer = await page.pdf({
			format: 'A4',
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
