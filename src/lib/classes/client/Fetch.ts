import { PUBLIC_API_BASE } from '$env/static/public';
import type IReply from '$lib/@types/system/IReply';

export interface IFetchBaseOptions {
	endpoint: string;
	base?: string;
	headers?: { [key: string]: string };
}

export interface IGetDeleteOptions extends IFetchBaseOptions {
	parameters?: { [key: string]: string };
}

export interface IPostPutPatchOptions extends IFetchBaseOptions {
	body?: BodyInit | null;
}

export interface IRequestOptions extends IFetchBaseOptions {
	method: string;
	parameters?: { [key: string]: string };
	body?: BodyInit | null;
}

interface IRequestHandler {
	request(options: IRequestOptions): Promise<IReply>;
}

class FetchRequestHandler implements IRequestHandler {
	async request({
		method,
		endpoint,
		base = PUBLIC_API_BASE,
		headers = {},
		parameters = {},
		body = null
	}: IRequestOptions): Promise<IReply> {
		const url = new URL(endpoint, base);

		if (parameters) {
			Object.keys(parameters).forEach((key) => {
				url.searchParams.append(key, parameters[key]);
			});
		}

		const _headers = new Headers({
			...headers
		});

		if (body) {
			_headers.append('Content-Type', 'application/json');
		}

		try {
			const response = await fetch(url.toString(), {
				method,
				headers: _headers,
				credentials: 'include',
				body: body ? body : null
			});

			const data = await response.json();
			return {
				success: response.ok,
				status: response.status,
				data: data
			};
		} catch (error) {
			return {
				success: false,
				status: 500,
				errors: ['Internal Server Error', error as string]
			};
		}
	}
}

/**
 * Fetch class provides methods to make HTTP requests using the Fetch API.
 * @usage ```typescript
 * import Fetch from 'path/to/Fetch';
 * const response = await Fetch.get({
 *     endpoint: '/example', // relative to PUBLIC_API_BASE or your specified base
 *     headers: { 'Authorization': 'Bearer token' },
 *     parameters: { param1: 'value1', param2: 'value2' }
 * });
 * ```
 */
class Fetch {
	private requestHandler: IRequestHandler = new FetchRequestHandler();

	async get({ endpoint, headers = {}, parameters = {} }: IGetDeleteOptions) {
		return this.requestHandler.request({
			method: 'GET',
			endpoint,
			headers,
			parameters
		});
	}

	async delete({ endpoint, headers = {}, parameters = {} }: IGetDeleteOptions) {
		return this.requestHandler.request({
			method: 'DELETE',
			endpoint,
			headers,
			parameters
		});
	}

	async post({ endpoint, headers = {}, body = null }: IPostPutPatchOptions) {
		return this.requestHandler.request({
			method: 'POST',
			endpoint,
			headers,
			body
		});
	}

	async put({ endpoint, headers = {}, body = null }: IPostPutPatchOptions) {
		return this.requestHandler.request({
			method: 'PUT',
			endpoint,
			headers,
			body
		});
	}

	async patch({ endpoint, headers = {}, body = null }: IPostPutPatchOptions) {
		return this.requestHandler.request({
			method: 'PATCH',
			endpoint,
			headers,
			body
		});
	}
}

export default Fetch;
