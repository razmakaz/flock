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

	// calculate the total tax amount of each invoice line item
	static calculateInvoiceLine(
		quantity: number,
		rate: number,
		taxRate: number,
		thresholdAmount: number
	) {
		// total time in item multiplied by the rate
		const totalAmount = quantity * rate;

		// apply tax to total amount
		const taxableAmount = Math.max(totalAmount - thresholdAmount, 0);
		const tax = taxableAmount * (taxRate / 100);
		return totalAmount - tax;
	}

	// return dates from startTime: (Exp: 12-10-2000)
	static getTimesheetDates = (startTime: string) => {
		const startDate = new Date(startTime);

		const month = startDate.getUTCMonth() + 1;
		const day = startDate.getUTCDate();
		const year = startDate.getUTCFullYear() % 100;

		return `${month}/${day}/${year}`;
	};

	// calculate line data and return
	static genDemoLineData(itemData: IInvoiceLineData) {
		const { id, start, end, date, title, tax = 2, thresholdAmount = 0, rate = 15 } = itemData;

		let quantity = 0;

		if (start && end) {
			quantity = this.getHourDifference(start, end) || 0;
		}

		const totalAmount = this.calculateInvoiceLine(quantity, rate, tax, thresholdAmount);

		const newDate = date || (start ? this.getTimesheetDates(start) : '');

		return {
			id: id,
			title: title,
			date: newDate,
			rate: rate,
			tax,
			quantity: quantity,
			total: totalAmount,
			start,
			end
		};
	}
}

export default InvoiceTools;
