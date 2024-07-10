import express from 'express';

import { VideoController } from '../controllers';

const router = express.Router();

router.get('/:id', VideoController.getVideo);
router.put('/:id', VideoController.updateVideo);
router.delete('/:id', VideoController.deleteVideo);

export default router;
