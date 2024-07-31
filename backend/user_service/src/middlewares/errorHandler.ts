import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';

export default function errorHandler(
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	console.log(error);

	if (error instanceof AppError) {
		return res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}

	res.status(500).json({
		success: false,
		message: 'Something went wrong',
	});
}
