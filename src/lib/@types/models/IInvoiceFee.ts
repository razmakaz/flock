import type { IModelsBase } from '.';
import type { IInvoice } from './IInvoice';

export interface IInvoiceFee extends IModelsBase {
	display_name: string;
	name: string;
	internal_name?: string;
	invoice: IInvoice;
	rate: number;
	amount: number;
}
