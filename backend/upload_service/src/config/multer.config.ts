import multer from 'multer';
import path from 'path';

import FileService from '../services/file.service';

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		if (req.path === '/initialize') {
			const thumbnailDir = FileService.getMediaDirectory({
				media: 'image',
			});
			await FileService.ensureDirectoryExists(thumbnailDir);
			return cb(null, thumbnailDir);
		}

		if (req.path === '/upload') {
			const { videoId }: { videoId: string } = req.body;
			const videoDir = FileService.getMediaDirectory({
				media: 'video',
				videoId,
			});
			await FileService.ensureDirectoryExists(videoDir);
			return cb(null, videoDir);
		}
	},

	filename: (req, file, cb) => {
		cb(null, FileService.randomName() + path.extname(file.originalname));
	},
});
const upload = multer({ storage });

export default upload;
