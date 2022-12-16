export const getAccessToken = () => {
	return localStorage.getItem('accessTokenNew') || null;
};
