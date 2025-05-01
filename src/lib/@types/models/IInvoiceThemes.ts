import type { IModelsBase } from '.';
import type { IOrganization } from './IOrganizations';

export interface IInvoiceThemes extends IModelsBase {
	theme_name: string;
	primary: string;
	secondary: string;
	organization: IOrganization;
}
