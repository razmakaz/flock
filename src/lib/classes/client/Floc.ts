import Sentry from '../shared/Sentry';
import Fetch from './Fetch';

class FlocClient {
	static log = Sentry;
	static fetch = new Fetch();
}

export default FlocClient;
