import express from 'express';

import watchController from '../controllers/watch.controller';

const router = express.Router();

router.get('/video/:videoId', watchController);

export default router;
