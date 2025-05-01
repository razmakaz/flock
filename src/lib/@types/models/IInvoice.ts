import type { IModelsBase } from '.';
import type { IContact } from './IContact';

export enum InvoiceType {
	QUOTE = 'QUOTE',
	INVOICE = 'INVOICE',
	CREDIT_NOTE = 'CREDIT_NOTE',
	DEBIT_NOTE = 'DEBIT_NOTE',
	RECEIPT = 'RECEIPT',
	PROFORMA = 'PROFORMA',
	PURCHASE_ORDER = 'PURCHASE_ORDER',
	OTHER = 'OTHER'
}
export interface IInvoice extends IModelsBase {
	id?: string;
	name: string;
	internal_name: string;
	tax_rate: number;
	tax_amount: number;
	type: InvoiceType;
	contact: IContact;
	issue_date: string;
	due_date: string;
	is_voided: boolean;
	status: string;
	note: string;
}
