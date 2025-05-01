import type { IIntegrationFeature } from './IIntegrationFeature';
import type { IModelsBase } from '.';

export interface IIntegrationTemplate extends IModelsBase {
	feature: IIntegrationFeature;
	key: string;
}
