import type { IContact } from './IContact';
import type { IModelsBase } from '.';

export interface IBankAccount extends IModelsBase {
	contact: IContact;
	account_holder_name: string;
	account_holder_type: string;
	account_holder_id_number?: string;
	account_holder_address: string;
	account_holder_country: string;
	account_number?: string;
	routing_number?: string;
	iban?: string;
	switft_bic?: string;
	bank_name: string;
	bank_code?: string;
	currency: string;
	country: string;
}
