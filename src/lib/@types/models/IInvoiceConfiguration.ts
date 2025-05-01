import type { IModelsBase } from '.';
import type { IContact } from './IContact';
import type { IOrganization } from './IOrganizations';

export interface IInvoiceConfiguration extends IModelsBase {
	theme: string; // TODO Make IInvoiceThemes;
	organization: IOrganization;
	contact: IContact;
	include_timesheets: boolean;
	include_statements: boolean;
	include_remittance: boolean;
	default_payments_terms: number;
	main_contact: IContact;
	billing_contacts: IContact;
}
