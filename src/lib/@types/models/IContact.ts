import type { IModelsBase } from '.';
import type { IAddress } from './IAddress';
import type { IBillingConfiguration } from './IBillingConfiguration';
import type { ITags } from './ITags';

export interface IContactBase extends IModelsBase {
	addresses?: IAddress[];
	contacts?: IContact[];
	phone?: string;
	mobile?: string;
	tags?: ITags[];
	billingConfiguration?: IBillingConfiguration;
}

export interface IBusinessContact extends IContactBase {
	id?: string;
	type: 'business';
	entity_name: string; // Required for business
	ein?: string;
	vat?: string;
}

export interface IIndividualContact extends IContactBase {
	id?: string;
	type: 'individual';
	prefix?: string;
	first_name: string; // Required for individual
	middle_name?: string;
	last_name?: string;
}

export type IContact = IBusinessContact | IIndividualContact;
