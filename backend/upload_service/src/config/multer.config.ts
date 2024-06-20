import multer from 'multer';
import path from 'path';

import randomName from '../utilities/randomName';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/');
	},

	filename: (req, file, cb) => {
		cb(null, randomName() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

export default upload;
