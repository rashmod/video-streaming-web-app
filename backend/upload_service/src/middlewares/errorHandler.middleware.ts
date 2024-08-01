import { NextFunction, Request, Response } from 'express';

import AppError from '../errors/AppError';
import ServiceResponse from '../http/ServiceResponse';
import handleServiceResponse from '../http/handleServiceResponse';

export default function errorHandler(
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	console.log(error);

	let response: ServiceResponse<unknown>;

	if (error instanceof AppError) {
		response = ServiceResponse.failure({
			errors: null,
			message: error.message,
			statusCode: error.statusCode,
		});
	} else {
		response = ServiceResponse.failure({
			errors: error,
			message: 'Something went wrong',
			statusCode: 500,
		});
	}

	handleServiceResponse(res, response);
}
