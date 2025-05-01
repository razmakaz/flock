import type { IModelsBase } from '.';

export interface IIntegrationFeature extends IModelsBase {
	name: string;
	integrator_logo: string;
	type: string;
	on_start: string;
	on_exec: string;
	on_stop: string;
}
