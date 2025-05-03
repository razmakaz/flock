import Sentry from '../shared/Sentry';
import God from './God';
import Mailer from './Mailer';

class FlocServer {
	static log = Sentry;
	static mailer = new Mailer();
	god = new God();
}

export default FlocServer;
