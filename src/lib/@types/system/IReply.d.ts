export default interface IReply {
	success?: boolean;
	data?: any;
	messages?: string[];
	errors?: string[];
	status?: number;

	// Pagination properties (optional)
	page?: number;
	perPage?: number;
	total?: number;
}
