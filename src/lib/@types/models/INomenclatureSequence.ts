import type { IModelsBase } from "./IModelBase";
import type { IOrganization } from "./IOrganizations";


export interface INomenclatureSequence extends IModelsBase {
    organization: IOrganization;
    invoice: number;
    credit_memo: number;
    payment_record: number;
    debit_memo: number;
    statement_memo: number;
    timesheet_memo: number;
    journal_entries: number;
}