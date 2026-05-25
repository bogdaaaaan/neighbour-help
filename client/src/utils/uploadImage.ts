import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

const uploadImage = async (imageFile: string | Blob) => {
	const formData = new FormData();
	formData.append('image', imageFile);

	try {
		const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
		return response.data;
	} catch (error) {
		if (error instanceof Error) {
			console.error('An error occurred while uploading an Image:', error);
		} else {
			console.error('An error occurred while uploading an Image');
		}
		throw error;
	}
};

export default uploadImage;