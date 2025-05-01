import type { IContact } from './IContact';
import type { IModelsBase } from '.';

export interface IAdjustment extends IModelsBase {
	display_name: string;
	name: string;
	internal_name: string;
	contact: IContact;
}
