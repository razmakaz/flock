import type { IModelsBase } from '.';
import type { IContact } from './IContact';

export interface IOrganization extends IModelsBase {
	id?: string;
	name: string;
	contact?: IContact;
	parent_organization?: IOrganization;
}
