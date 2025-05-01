import type { IModelsBase } from '.';

export interface IMarketingPreferences extends IModelsBase {
	id?: string;
	email: string;
	email_notifications?: boolean;
	sms_notifications?: boolean;
	push_notifications?: boolean;
	subscription_status?: 'active' | 'inactive' | 'cancelled';
}
