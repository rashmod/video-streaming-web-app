import express from 'express';

import { UserController } from '../controllers';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
