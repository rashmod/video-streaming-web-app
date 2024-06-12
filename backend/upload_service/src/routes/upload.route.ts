import express from 'express';

import uploadController from '../controllers/upload.controller';
import upload from '../config/multer.config';

const router = express.Router();

router.post('/', upload.single('video'), uploadController);

export default router;
