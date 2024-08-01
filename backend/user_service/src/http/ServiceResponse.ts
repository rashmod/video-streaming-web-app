export default class ServiceResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
	errors: T | null;
	statusCode: number;
	constructor(data: SuccessResponse<T> | ErrorResponse<T>) {
		this.success = data.success;
		this.message = data.message;
		this.statusCode = data.statusCode;

		if (this.isSuccess(data)) {
			this.data = data.data;
			this.errors = null;
		} else {
			this.data = null;
			this.errors = data.errors;
		}
	}

	serialize() {
		return {
			success: this.success,
			message: this.message,
			data: this.data,
			errors: this.errors,
		};
	}

	private isSuccess<T>(
		data: SuccessResponse<T> | ErrorResponse<T>
	): data is SuccessResponse<T> {
		return data.success;
	}

	static success<T>(
		data: Omit<SuccessResponse<T>, 'success'>
	): ServiceResponse<T> {
		return new ServiceResponse<T>({
			success: true,
			message: data.message,
			data: data.data,
			statusCode: data.statusCode,
		});
	}

	static failure<T>(
		data: Omit<ErrorResponse<T>, 'success'>
	): ServiceResponse<T> {
		return new ServiceResponse<T>({
			success: false,
			message: data.message,
			errors: data.errors,
			statusCode: data.statusCode,
		});
	}
}

type SuccessResponse<T> = {
	success: true;
	message: string;
	data: T;
	statusCode: number;
};

type ErrorResponse<T> = {
	success: false;
	message: string;
	errors: T;
	statusCode: number;
};
