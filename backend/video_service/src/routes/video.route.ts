import express from 'express';

import { VideoController } from '../controllers';
import catchAsync from '../utilities/catchAsync';
import authMiddleware from '../middlewares/auth.middleware';
import isAuthorMiddleware from '../middlewares/isAuthor.middleware';

const router = express.Router();

router.route('/').get(catchAsync(VideoController.findMany));
router
	.route('/profile')
	.get(authMiddleware, catchAsync(VideoController.getMyVideos));
router.route('/user/:id').get(catchAsync(VideoController.getUserVideos));
router
	.route('/:id')
	.get(catchAsync(VideoController.getVideo))
	.put(
		authMiddleware,
		catchAsync(isAuthorMiddleware),
		catchAsync(VideoController.updateVideo)
	)
	.delete(
		authMiddleware,
		catchAsync(isAuthorMiddleware),
		catchAsync(VideoController.deleteVideo)
	);

export default router;
