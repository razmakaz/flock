import type { IModelsBase } from '.';

export interface IAddress extends IModelsBase {
	address_line_1: string;
	address_line_2?: string;
	address_line_3?: string;
	city?: string;
	region?: string;
	postal_code?: string;
	country?: string;
	is_default?: boolean;
}
