import { PRIVATE_PB_ADMIN_EMAIL, PRIVATE_PB_ADMIN_PASSWORD } from '$env/static/private';
import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase from 'pocketbase';

class God {
	db: PocketBase;
	constructor() {
		this.db = new PocketBase(PUBLIC_PB_URL);
		this.authenticate();
	}

	private async authenticate() {
		this.db
			.collection('_superusers')
			.authWithPassword(PRIVATE_PB_ADMIN_EMAIL, PRIVATE_PB_ADMIN_PASSWORD)
			.catch((e) => {
				console.log(e);
			});
	}
}

export default God;
