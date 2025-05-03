import type { IAuthPermissionTemplate, IContact, IModelsBase, IOrganization } from '.';

export interface IAuthRole extends IModelsBase {
	name: string;
	contact: IContact;
	organization: IOrganization;
	template: IAuthPermissionTemplate;
}
