import type { IModelsBase } from '.';

export interface ITags extends IModelsBase {
	id?: string;
	name: string;
	description?: string;
	color?: string;
}
