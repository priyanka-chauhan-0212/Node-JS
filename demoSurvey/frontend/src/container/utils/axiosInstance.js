import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory, Redirect } from 'react-router-dom';

import { BACKEND_URL_SERVER } from '../../container/constants/connections';
// import Toast from '../../container/components/Toast';
// import { ROUTE_SIGN_IN } from '../../container/routes/routes';
import { getAccessToken } from '../../container/utils/getAccessToken';
import { ErrorToast } from '../../container/components/ToastComponent/index';
import { ROUTE_SIGN_IN } from '../../router/routes';

let axiosInstance = axios.create({
	baseURL: `${BACKEND_URL_SERVER}/`,
	// baseURL: 'https://nps.ourtempurl.xyz/admin/api/v1',
	timeout: 80000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.defaults.headers.post['Content-Type'] =
	'application/x-www-form-urlencoded';
// axiosInstance.defaults.headers.common['Authorization'] = getAccessToken() ? `Bearer ${getAccessToken()}` : '';
// axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInstance.interceptors.request.use(
	(config) => {
		let token = getAccessToken();

		if (token) {
			config.headers.Authorization = `Bearer ${getAccessToken()}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const responseData = error.response
			? error.response.data
			: {
					code: 0,
					message: error.message,
			  };

		// toast.error(<ErrorToast message={responseData.message} />);
		const statusData = error.response ? error.response.status : 500;

		console.log('axios instance log', { responseData, statusData });
		if (statusData === 401) {
			localStorage.clear();
			// window.location.href = ROUTE_SIGN_IN;
			// useHistory().push(ROUTE_SIGN_IN);

			// history.push(ROUTE_SIGN_IN);
		}

		return Promise.reject({
			status: statusData || 500,
			data: responseData,
		});
	}
);

export default axiosInstance;
