import express from 'express';

import controller from '../controllers/index.controller';
import upload from '../config/multer.config';

const router = express.Router();

router.post(
	'/initialize',
	upload.single('thumbnail'),
	controller.initializeUploadController
);
router.post('/upload', upload.single('video'), controller.uploadController);
router.post('/complete', controller.completeUploadController);

export default router;
