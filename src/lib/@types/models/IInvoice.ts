import type { IModelsBase } from '.';
import type { EInvoiceType } from './EInvoiceType';
import type { IContact } from './IContact';
export interface IInvoice extends IModelsBase {
	id?: string;
	name: string;
	internal_name: string;
	tax_rate: number;
	tax_amount: number;
	type: EInvoiceType;
	contact: IContact;
	issue_date: string;
	due_date: string;
	is_voided: boolean;
	status: string;
	note: string;
}
