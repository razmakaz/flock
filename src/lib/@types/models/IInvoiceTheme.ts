import type { IModelsBase } from '.';
import type { IOrganization } from './IOrganizations';

export interface IInvoiceTheme extends IModelsBase {
	theme_name: string;
	primary: string;
	secondary: string;
	organization: IOrganization;
}
