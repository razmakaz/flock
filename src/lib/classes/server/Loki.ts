import { PUBLIC_LOKI_ENDPOINT } from '$env/static/public';

export interface ILokiLog {
	url?: string;
	app?: string;
	level?: string;
	message?: string;
}
class Loki {
	static async log({
		url = PUBLIC_LOKI_ENDPOINT || '',
		app = 'floc',
		level = 'info',
		message = 'No message provided'
	}: ILokiLog) {
		return await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// Your LokiDB log data here
				streams: [
					{
						stream: {
							app: app,
							level: level
						},
						values: [[Date.now() * 1_000_000, JSON.stringify({ message })]]
					}
				]
			})
		});
	}
}

export default Loki;
