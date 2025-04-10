export interface IBankInvoiceData {
	bankName: string;
	accountName: string;
	accountNumber: string;
	routingNumber: string;
}

export interface IInvoiceLineData {
	id: string;
	title: string;
	date: string;
	rate: number;
	quantity: number;
	total: number;

	start?: string;
	end?: string;

	tax: number;
	thresholdAmount?: number;
}

export interface IInvoiceData {
	companyName: string;
	client: string;
	address: string;
	number: string;
	issueDate: string;
	dueDate: string;
	items: IInvoiceLineData[];
	subtotal: number;
	totalAmount: number;
	bank: IBankInvoiceData;
}
