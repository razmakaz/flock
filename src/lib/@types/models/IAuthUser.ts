import type { IModelsBase } from '.';

export interface IAuthUser extends IModelsBase {
	id?: string;
	name?: string;
	email?: string;
}
