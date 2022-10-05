import { RequestOptions } from './types';

export const makeAPIRequest = (endpoint: string, method = 'GET', body: {} | null = null) => {
  console.log('req')
	const requestOptions: RequestOptions = {
		method,
		headers: {
			Authorization: process.env.BALLCHASING_TOKEN || ''
		}
	}

	if (body) {
		requestOptions.body = JSON.stringify(body);
	}
	try {
		const res = fetch(`https://ballchasing.com/api/${endpoint}`, requestOptions);
		return res;
	} catch (err) {
		console.log(err);
	}
}