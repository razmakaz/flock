import type { IBillingConfiguration } from './IBillingConfiguration';
import type { IContact } from './IContact';
import type { IModelsBase } from '.';

export interface ICompanyDepartments extends IModelsBase {
	name: string;
	contact: IContact;
	billing_configuration: IBillingConfiguration;
}
