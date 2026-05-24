import multer from 'multer';

// Configure multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

// File filter
const fileFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
	const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
	if (allowedTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error('Invalid file type. Only JPG, JPEG and PNG are allowed!'));
	}
};

const upload = multer({ storage, fileFilter });

export default upload;