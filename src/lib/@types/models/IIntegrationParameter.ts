import type { IContact } from './IContact';
import type { IIntegrationTemplate } from './IIntegrationTemplate';
import type { IModelsBase } from '.';

export interface IIntegrationParameter extends IModelsBase {
	contact: IContact;
	key: string;
	value: string;
	template: IIntegrationTemplate;
	input_type: string;
}
