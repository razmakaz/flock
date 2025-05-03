import type { IModelsBase } from "./IModelBase";
import type { IOrganization } from "./IOrganizations";


export interface INomenclatureConfiguration extends IModelsBase {
    name: string;
    organization: IOrganization;
    invoice: string;
    credit_memo: string;
    payment_record: string;
    debit_memo: string;
    statement_memo: string;
    timesheet: string;
    journal_entries: string;
}