import type { IModelsBase } from '.';
import type { IAuthUser } from './IAuthUser';
import type { IMarketingOnboarding } from './IMarketingOnboarding';
import type { IMarketingPreferences } from './IMarketingPreferences';

export interface IProfile extends IModelsBase {
	id?: string;
	user: IAuthUser;
	marketing_onboarding: IMarketingOnboarding;
	marketing_preferences: IMarketingPreferences;
}
