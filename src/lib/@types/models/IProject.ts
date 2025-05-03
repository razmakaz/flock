import type { IBillingConfiguration } from "./IBillingConfiguration";
import type { ICompanyDepartments } from "./ICompanyDepartment";
import type { ICompanyLocation } from "./ICompanyLocation";
import type { IModelsBase } from "./IModelBase";
import type { IPaycode } from "./IPaycode";


export interface IProjects extends IModelsBase {
    name: string;
    timesheet_template: string;
    company_location: ICompanyLocation;
    department: ICompanyDepartments;
    available_rates: IPaycode;
    billing_configuration: IBillingConfiguration;
}