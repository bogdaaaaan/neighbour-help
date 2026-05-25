export const BASE_URL = 'http://localhost:5000';

export const API_PATHS = {
	AUTH: {
		// Register new user
		REGISTER: '/api/auth/register',

		// Login user & return JWT token
		LOGIN: '/api/auth/login',

		// Get user profile details
		GET_PROFILE: '/api/auth/profile',
	},

	IMAGE: {
		// Upload image
		UPLOAD_IMAGE: '/api/auth/upload-image'
	},
};