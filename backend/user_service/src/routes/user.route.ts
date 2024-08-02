import express from 'express';

import { UserController } from '../controllers';
import catchAsync from '../utilities/catchAsync';
import authMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.route('/refresh_token').post(catchAsync(UserController.refreshToken));
router.route('/register').post(catchAsync(UserController.registerUser));
router.route('/login').post(catchAsync(UserController.loginUser));
router.route('/logout').post(UserController.logoutUser);
router
	.route('/:id')
	.get(catchAsync(UserController.getUser))
	.put(authMiddleware, catchAsync(UserController.updateUser))
	.delete(authMiddleware, catchAsync(UserController.deleteUser));

export default router;
