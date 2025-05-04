import Sentry from '$lib/classes/shared/Sentry';
import Reply from '$lib/server/Reply';

export const GET = () => {
	Sentry.debug('Received request to check server status');

	return Reply({
		success: true,
		data: {
			message: 'Server is running'
		},
		status: 200
	});
};
