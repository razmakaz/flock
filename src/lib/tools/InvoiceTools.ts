class InvoiceTools {
	instance: InvoiceTools | null = null;

	constructor() {
		if (this.instance) return this.instance;
		this.instance = this;
	}

	// use this function to take the end time and use it for the service date
	static getHourDifference(startTime: string, endTime: string) {
		const startDate = new Date(startTime);
		const endDate = new Date(endTime);

		const diffInMs = Math.abs(endDate - startDate);

		// convert milliseconds to hours
		const diffInHours = diffInMs / (1000 * 60 * 60);
		return diffInHours;
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
	static genDemoLineData(timesheetData: any, rate = 0, taxRate = 0, thresholdAmount = 0) {
		const { id, start, end, title } = timesheetData;

		const quantity = this.getHourDifference(start, end);
		const totalAmount = this.calculateInvoiceLine(quantity, rate, taxRate, thresholdAmount);
		const date = this.getTimesheetDates(start);

		return {
			id: id,
			title: title,
			date: date,
			rate: rate,
			tax: taxRate,
			quantity: quantity,
			total: totalAmount
		};
	}
}

export default InvoiceTools;
