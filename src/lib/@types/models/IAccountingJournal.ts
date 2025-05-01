import type { IContact } from './IContact';
import type { IModelsBase } from '.';

export interface IAccountingJournal extends IModelsBase {
	contact?: IContact;
	name: string;
	balance: number;
}
