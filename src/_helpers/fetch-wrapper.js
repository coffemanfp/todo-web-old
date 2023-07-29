import { authActions } from '../_store/authSlice'

export const createURL = url => {
    return baseURL + url
}
const baseURL = 'http://localhost:8080/v1/'

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = authToken();
    return (!!token && url.startsWith(baseURL))
        ? { Authorization: `Bearer ${token}`} : {};
}

function authToken() {
    return localStorage.getItem('token');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = {
                message: (data && data.message) || response.statusText,
                code: response.status
            }
            return Promise.reject(error);
        }

        return data;
    });
}