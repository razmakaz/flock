import type { AuthRecord } from 'pocketbase';

export interface ISession {
	token: string;
	record: AuthRecord;
}
