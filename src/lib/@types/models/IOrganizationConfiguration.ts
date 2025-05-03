import type { IModelsBase } from "./IModelBase";
import type { IOrganization } from "./IOrganizations";


export interface IOrganizationConfiguration extends IModelsBase {
    organization: IOrganization;
    invoice_rate: number;
    mau_rate: number;
    payments_rate: number;
    priority: number;
    effective: Date;
    ends?: Date;
}