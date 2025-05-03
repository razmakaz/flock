import type { IContact } from ".";
import type { IModelsBase } from "./IModelBase";
import type { IOrganizationConfiguration } from "./IOrganizationConfiguration";

export interface IActiveService extends IModelsBase {
    name: string;
    organization: IOrganizationConfiguration;
    contact: IContact;
    renewel_frequency: string;
    plan: string;
}