import Reply from '$lib/server/Reply';

export const GET = () => {
	return Reply({
		success: true,
		data: {
			message: 'Server is running'
		},
		status: 200
	});
};
