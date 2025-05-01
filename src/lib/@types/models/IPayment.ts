import type { IModelsBase } from '.';
import type { IContact } from './IContact';
import type { IInvoice } from './IInvoice';

export interface IPayment extends IModelsBase {
	id?: string;
	name: string;
	display_name: string;
	internal_name: string;
	invoice: IInvoice;
	currency: string;
	amount: number;
	payment_date: string;
	payment_id: string;
	payment_method: string; // Set up payment providers as an enum or constants elsewhere
	payment_provider: string;
	payment_reference: string;
	to: IContact;
	cc: IContact[];
	bcc: IContact[];
	from: IContact[];
}
