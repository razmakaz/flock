import type { IModelsBase } from '.';
import type { IOrganization } from './IOrganizations';
import type { IPurchase } from './IPurchase';

export interface ILicenses extends IModelsBase {
	id?: string;
	organization: IOrganization;
	type: string;
	purchase: IPurchase;
}
