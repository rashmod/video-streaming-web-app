import express from 'express';

import { VideoController } from '../controllers';
import catchAsync from '../utilities/catchAsync';

const router = express.Router();

router
	.route('/:id')
	.get(catchAsync(VideoController.getVideo))
	.put(catchAsync(VideoController.updateVideo))
	.delete(catchAsync(VideoController.deleteVideo));

export default router;
