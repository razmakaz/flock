import type { IInvoiceLineData } from '$lib/@types/IInvoice';

class InvoiceTools {
	instance: InvoiceTools | null = null;

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}

	static getHourDifference(startTime: string, endTime: string) {
		const startDate = new Date(startTime);
		const endDate = new Date(endTime);

		// checking if both dates are valid
		if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
			return undefined;
		}

		const diffInMs = endDate.getTime() - startDate.getTime();
		const hourDiff = diffInMs / (1000 * 60 * 60);

		return hourDiff;
	}

	static calcSubtotal(itemData: IInvoiceLineData) {
		const { start, end, rate } = itemData;
		if (!start || !end || !rate) return;

		const quantity = this.getHourDifference(start, end) || 0;

		return quantity * rate;
	}

	/**
	 * Calculates the total amount for an invoice line item including tax.
	 *
	 * @param lineData The invoice line item data
	 * @returns The total amount including tax
	 */
	static calculateInvoiceLine(lineData: any) {
		const { quantity, rate, thresholdAmount = 0, tax } = lineData;

		// total time in item multiplied by the rate
		const subtotal = quantity * rate;

		// apply tax to total amount
		const taxableAmount = Math.max(subtotal - thresholdAmount, 0);
		const taxAmount = taxableAmount * (tax / 100);
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
		const { id, start, end, date, title, tax = 2, thresholdAmount = 0, rate = 15 } = itemData;

		let quantity = 0;

		if (start && end) {
			quantity = this.getHourDifference(start, end) || 0;
		}

		const totalAmount = this.calculateInvoiceLine({ quantity, rate, tax, thresholdAmount });

		const newDate = date || (start ? this.getTimesheetDates(start) : '');

		return {
			id: id,
			title: title,
			date: newDate,
			rate: rate,
			tax,
			quantity: quantity,
			total: totalAmount
		};
	}
}

export default InvoiceTools;
