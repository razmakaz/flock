import type { IMailOptions, IMailProvider } from './Mailer';
import { PRIVATE_RESEND_API_KEY } from '$env/static/private';
import { Resend as ResendClient } from 'resend';
import type IReply from '$lib/@types/system/IReply';

class Resend implements IMailProvider {
	async send(message: IMailOptions): Promise<IReply> {
		return Resend.send(message);
	}

	static async send(message: IMailOptions): Promise<IReply> {
		const client = new ResendClient(PRIVATE_RESEND_API_KEY);
		const msg = {
			to: message.to,
			from: message.from || 'support@floc.dev',
			cc: message.cc || [],
			bcc: message.bcc || [],
			subject: message.subject,
			text: message.body || '',
			html: message.html || `<p>${message.body || ''}</p>`
		} satisfies IMailOptions;
		try {
			const response = await client.emails.send(msg);
			if (!response || !Array.isArray(response) || response.length === 0) {
				throw new Error('No response received from SendGrid');
			}

			return {
				success: true,
				data: null
			};
		} catch (error) {
			console.error('Error sending email:', error);
			return {
				success: false,
				errors: ['Failed to send email']
			};
		}
	}
}

export default Resend;
