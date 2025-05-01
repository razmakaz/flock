import type { IModelsBase } from '.';
import type { IContact } from './IContact';

export interface IBillingConfiguration extends IModelsBase {
	id?: string;
	main_billing_contact: IContact;
	billing_contacts: IContact[];
	timesheet_contacts: IContact[];
	invoice_separately?: boolean;
	po_number: string;
}
