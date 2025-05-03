import type { IAccountingJournal } from ".";
import type { IModelsBase } from "./IModelBase";


export interface IJounrnalEntry extends IModelsBase {
    journal: IAccountingJournal;
    display: string;
    name: string;
    internal_name: string;
    debit: number;
    credit: number;
    paired_transaction: string;
    spawned_by: string;
    spawned_by_id: string;
    pending: boolean;
    applied: Date
}