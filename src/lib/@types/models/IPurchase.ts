import type { IModelsBase } from '.';
import type { IContact } from './IContact';
import type { IInvoice } from './IInvoice';

export interface IPurchase extends IModelsBase {
	id?: string;
	product: string; // TODO Change to IProduct when available
	contact: IContact;
	invoice: IInvoice;
}
