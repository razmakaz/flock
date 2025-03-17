export interface IAPIResponse {
	data?: any;
	errors?: string[];
}

export const APIResponse = ({
	data = null,
	message = null,
	errors = [],
	status = 400
}: {
	data?: any;
	message?: string | null;
	errors?: string[];
	status?: number;
}) => {
	return new Response(JSON.stringify({ data, message, errors }), {
		headers: { 'Content-Type': 'application/json' },
		status
	});
};
