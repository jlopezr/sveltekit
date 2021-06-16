
import cookie from 'cookie';
import { v4 as uuid } from '@lukeed/uuid';
import type { Handle } from '@sveltejs/kit';

//https://kit.svelte.dev/docs#hooks

const trimCharEnd = (string, charToRemove) => {
    while (string.charAt(string.length - 1) == charToRemove) {
        string = string.substring(0, string.length - 1);
    }
    return string;
}

const getQueryString = (query) => {
    let info = query.toString();
    return info ? '?' + info : info;
}

const buildLogString = (request, response) => {
    return [request.method, request.host + trimCharEnd(request.path, '/') + getQueryString(request.query), '=>', response.headers["content-type"], response.status].join(" ");
}

export const handle: Handle = async ({ request, resolve }) => {
	const cookies = cookie.parse(request.headers.cookie || '');
	request.locals.userid = cookies.userid || uuid();

	// TODO https://github.com/sveltejs/kit/issues/1046
	if (request.query.has('_method')) {
		request.method = request.query.get('_method').toUpperCase();
	}

	const response = await resolve(request);

	console.log(buildLogString(request, response));

	if (!cookies.userid) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers['set-cookie'] = `userid=${request.locals.userid}; Path=/; HttpOnly`;
	}

	return response;
};