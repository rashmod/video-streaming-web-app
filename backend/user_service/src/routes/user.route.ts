import express from 'express';

import { UserController } from '../controllers';
import catchAsync from '../utilities/catchAsync';

const router = express.Router();

router.post('/register', catchAsync(UserController.registerUser));
router.get('/:id', catchAsync(UserController.getUser));
router.put('/:id', catchAsync(UserController.updateUser));
router.delete('/:id', catchAsync(UserController.deleteUser));

export default router;
