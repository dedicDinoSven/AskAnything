export const jwtConfig = () => {
	const user = JSON.parse(localStorage.getItem('user'));

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
    
	if (user && user.accessToken) {
		config.headers['x-access-token'] = user.accessToken;
	}

	return config;
};

export const createError = (error) => {
	const message = (error.response &&
		error.response.data &&
		error.response.data.message) ||
	error.message ||
	error.toString();

	return message;
}