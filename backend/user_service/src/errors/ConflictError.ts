import AppError from './AppError';

export default class ConflictError extends AppError {
	constructor(message: string) {
		super(message, 409);
	}
}
