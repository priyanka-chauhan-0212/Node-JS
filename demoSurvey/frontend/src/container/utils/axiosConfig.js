import { getAccessToken } from './getAccessToken';

let config = {
	headers: {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + getAccessToken(),
	},
	// withCredentials: true,
	credentials: 'include',
};

export default config;
