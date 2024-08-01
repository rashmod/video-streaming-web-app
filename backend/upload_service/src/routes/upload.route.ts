import express from 'express';

import controller from '../controllers/index.controller';
import upload from '../config/multer.config';
import authMiddleware from '../middlewares/auth.middleware';
import catchAsync from '../utilities/catchAsync';

const router = express.Router();

router.post(
	'/initialize',
	authMiddleware,
	upload.single('thumbnail'),
	catchAsync(controller.initializeUploadController)
);
router.post(
	'/upload',
	upload.single('video'),
	catchAsync(controller.uploadController)
);
router.post('/complete', catchAsync(controller.completeUploadController));

export default router;
