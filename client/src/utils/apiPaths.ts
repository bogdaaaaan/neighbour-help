export const BASE_URL = import.meta.env.VITE_API_URL;

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

	REQUESTS: {
		// Get requests
		GET_REQUESTS: '/api/requests/',

		// Get requests by user
		GET_USER_REQUESTS: (id: string) => `/api/requests/user/${id}`,

		// Create new request
		CREATE_REQUEST: '/api/requests/create',

		// Delete request by id
		DELETE_REQUEST: (id: string) => `api/requests/${id}`,

		// Accept request by id
		ACCEPT_REQUEST: (id: string) => `api/requests/${id}/accept`,

		// Complete request by id
		COMPLETE_REQUEST: (id: string) => `api/requests/${id}/complete`
	},
};