import type { IContact } from './IContact';
import type { IAddress } from './IAddress';
import type { IBillingConfiguration } from './IBillingConfiguration';
import type { IModelsBase } from '.';

export interface ICompanyLocation extends IModelsBase {
	name: string;
	contact: IContact;
	address: IAddress;
	billing_configuration: IBillingConfiguration;
}
