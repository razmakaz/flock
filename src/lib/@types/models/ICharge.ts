import type { IContact } from './IContact';
import type { IModelsBase } from '.';

export interface ICharge extends IModelsBase {
	contact: IContact;
	amount: number;
	recurring: boolean;
	date: Date;
	recurring_frequency: string;
	recurring_date: Date;
	start_date: Date;
	end_date: Date;
}
