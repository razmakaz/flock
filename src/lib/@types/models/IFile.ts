import type { IModelsBase } from '.';
import type { ITags } from './ITags';

export interface IFile extends IModelsBase {
	id?: string;
	name: string;
	s3_key: string;
	bucket: string;
	content_type: string;
	size: number;
	tags: ITags[];
}
