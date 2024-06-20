import multer from 'multer';
import path from 'path';
import fs from 'fs';

import randomName from '../utilities/randomName';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { videoId }: { videoId: string } = req.body;

		const uploadDir = './uploads/';
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir);
		}

		const videoDir = path.join(uploadDir, videoId);
		if (!fs.existsSync(videoDir)) {
			fs.mkdirSync(videoDir);
		}

		cb(null, videoDir);
	},

	filename: (req, file, cb) => {
		cb(null, randomName() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

export default upload;
