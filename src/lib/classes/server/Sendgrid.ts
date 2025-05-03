// import type { IMailOptions, IMailProvider } from './Mailer';
// import { PRIVATE_SENDGRID_API_KEY } from '$env/static/private';
// import sgMail from '@sendgrid/mail';
// import STD, { type ISTDResponse } from '../Standardizer';

// class Sendgrid implements IMailProvider {

// constructor() {
// 	sgMail.setApiKey(PRIVATE_SENDGRID_API_KEY);
// }

// async send(message: IMailOptions): Promise<ISTDResponse> {
// 	return Sendgrid.send(message);
// }

// static async send(message: IMailOptions): Promise<ISTDResponse> {
// 	const msg = {
// 		to: message.to,
// 		from: message.from || 'support@backofficenow.com',
// 		cc: message.cc || [],
// 		bcc: message.bcc || [],
// 		subject: message.subject,
// 		text: message.body || '',
// 		html: message.html || `<p>${message.body || ''}</p>`
// 	};
// 	try {
// 		const [response] = await sgMail.send(msg);
// 		if (!response || !Array.isArray(response) || response.length === 0) {
// 			throw new Error('No response received from SendGrid');
// 		}

// 		return await STD.response({
// 			success: true,
// 			data: null
// 		});
// 	} catch (error) {
// 		console.error('Error sending email:', error);
// 		return STD.response({
// 			success: false,
// 			errors: ['Failed to send email']
// 		});
// 	}
// }
// }

// export default Sendgrid;
