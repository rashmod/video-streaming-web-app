import { Response } from 'express';
import ServiceResponse from './ServiceResponse';

export default function handleServiceResponse<T>(
	response: Response,
	serviceResponse: ServiceResponse<T>
) {
	return response
		.status(serviceResponse.statusCode)
		.json(serviceResponse.serialize());
}
