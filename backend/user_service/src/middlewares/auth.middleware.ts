import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';
import AuthService from '../services/auth.service';

// todo a better way to do this
declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}

declare module 'jsonwebtoken' {
	interface JwtPayload {
		id: string;
	}
}

export default function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;
	if (!authorization) {
		throw new UnauthorizedError('Authorization header not found');
	}

	const [, token] = authorization.split(' ');
	if (!token) {
		throw new UnauthorizedError('Invalid Authorization token');
	}

	try {
		const payload = AuthService.verifyToken(token, 'access') as JwtPayload;
		const { id }: { id?: string } = payload;
		if (!id) {
			throw new UnauthorizedError('Invalid payload');
		}

		req.userId = id;
		next();
	} catch (error) {
		next(error);
	}
}
