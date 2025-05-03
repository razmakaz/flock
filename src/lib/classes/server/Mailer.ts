import type IReply from '$lib/@types/system/IReply';
import Resend from './Resend';

export interface IMailOptions {
	to: string;
	from: string;
	cc?: string[];
	bcc?: string[];
	subject: string;
	body?: string;
	text?: string;
	html?: string;
}

export interface IMailProvider {
	send(message: IMailOptions): Promise<IReply>;
}

class Mailer {
	constructor(public provider: IMailProvider = new Resend()) {
		this.provider = provider;
	}

	async send(message: IMailOptions): Promise<IReply> {
		return this.provider.send(message);
	}
}

export default Mailer;
