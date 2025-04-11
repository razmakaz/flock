import type { IInvoiceLineData } from '$lib/@types/IInvoice';

class DemoInvoiceTools {
	instance: DemoInvoiceTools | null = null;

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}

	static getHourDifference(startTime: string, endTime: string) {
		const startDate = new Date(startTime);
		const endDate = new Date(endTime);

		// checking if both dates are valid
		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			console.log('No valid dates');
			return undefined;
		}

		const diffInMs = endDate.getTime() - startDate.getTime();
		const hourDiff = diffInMs / (1000 * 60 * 60);

		return hourDiff;
	}

	static calcSubtotal(itemData: IInvoiceLineData) {
		return itemData.quantity * itemData.rate;
	}

	/**
	 * Calculates the total amount for an invoice line item including tax.
	 * @param lineData The invoice line item data
	 * @returns The total amount including tax
	 */
	static calculateInvoiceLine(newQuantity: number, rate: number, tax: number) {
		// total time in item multiplied by the rate
		const subtotal = newQuantity * rate;

		// apply tax to total amount
		const taxAmount = subtotal * (tax / 100);
		return Number((subtotal + taxAmount).toFixed(2));
	}

	/**
	 * Calculates the date of the startTime
	 * @param startTime The start of the timesheet shift
	 * @returns The date of startTime
	 * */
	static getTimesheetDates = (startTime: string) => {
		const startDate = new Date(startTime);

		const month = startDate.getUTCMonth() + 1;
		const day = startDate.getUTCDate();
		const year = startDate.getUTCFullYear() % 100;

		return `${month}/${day}/${year}`;
	};

	/**
	 * Calculates the invoice line data such as quantity and total after tax
	 * @param itemData The data of the invoice line
	 * @returns New invoice line object with updated values
	 */
	static genDemoLineData(itemData: IInvoiceLineData) {
		const { id, start, end, date, title, tax = 2, rate = 15 } = itemData;

		let newQuantity = itemData.quantity;

		if (start && end) {
			newQuantity = this.getHourDifference(start, end) || 0;
		}

		const totalAmount = this.calculateInvoiceLine(newQuantity, rate, tax);

		const newDate = date || (start ? this.getTimesheetDates(start) : '');

		return {
			id: id,
			title: title,
			date: newDate,
			rate: rate,
			tax,
			quantity: newQuantity,
			total: totalAmount
		};
	}
}

export default DemoInvoiceTools;
