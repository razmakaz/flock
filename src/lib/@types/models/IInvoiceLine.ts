import type { IModelsBase } from '.';

export interface IInvoiceLine extends IModelsBase {
	date: string;
	name: string;
	description?: string;
	rate: number;
	discount?: number;
	quantity: number;
	total: number;
	tax_rate?: number;
	tax_amount?: number;
}
