import multer from 'multer';
import streamifier from 'streamifier';

import cloudinary from '../configs/cloudinary.js';

const storage = multer.memoryStorage();

const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Only image files are allowed'), false);
	}
};

const upload = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				folder: 'avatars',
			},
			(error, result) => {
				if (error || !result) {
					reject(error);
					return;
				}

				resolve(result.secure_url);
			}
		);

		streamifier.createReadStream(buffer).pipe(stream);
	});
};

export { upload, uploadToCloudinary };