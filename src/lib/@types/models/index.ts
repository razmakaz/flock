export interface IModels {
	[key: string]: any;
}

export interface IModelsBase extends IModels {
	is_deleted?: boolean;
	created?: string;
	updated?: string;
}
