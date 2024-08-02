import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import { UnauthorizedError } from '../errors';

export default async function isAuthorMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const userId = req.userId;

	const user = await UserService.findById(userId);

	if (user.id !== userId) {
		throw new UnauthorizedError('You are not the author of this video');
	}

	next();
}
