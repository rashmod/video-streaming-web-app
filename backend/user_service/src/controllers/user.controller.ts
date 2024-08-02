import { Request, Response } from 'express';

import UserService from '../services/user.service';
import ServiceResponse from '../http/ServiceResponse';
import handleServiceResponse from '../http/handleServiceResponse';

export default class UserController {
	static async registerUser(req: Request, res: Response) {
		const {
			name,
			email,
			password,
		}: { name: string; email: string; password: string } = req.body;

		const user = await UserService.createUser({ name, email, password });

		const response = ServiceResponse.success({
			data: user,
			message: 'User created successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async getUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const user = await UserService.getUserById(id);

		const response = ServiceResponse.success({
			data: user,
			message: 'User fetched successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async updateUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;
		const { name = 'john wick' }: { name: string } = req.body;

		const user = await UserService.updateUser(id, { name });

		const response = ServiceResponse.success({
			data: user,
			message: 'User updated successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async deleteUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const user = await UserService.deleteUser(id);

		const response = ServiceResponse.success({
			data: user,
			message: 'User deleted successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async loginUser(req: Request, res: Response) {
		const { email, password }: { email: string; password: string } =
			req.body;

		const { user, accessToken, refreshToken } = await UserService.loginUser(
			email,
			password
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			path: '/refresh_token',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		const response = ServiceResponse.success({
			data: { user, accessToken },
			message: 'User logged in successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static logoutUser(_req: Request, res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure: true,
			path: '/refresh_token',
			maxAge: 0,
		});

		const response = ServiceResponse.success({
			data: null,
			message: 'User logged out successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async refreshToken(req: Request, res: Response) {
		const { refreshToken: token }: { refreshToken: string } = req.cookies;
		const { accessToken, refreshToken } = await UserService.refreshToken(
			token
		);

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: true,
			path: '/refresh_token',
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		const response = ServiceResponse.success({
			data: accessToken,
			message: 'Token refreshed successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}
}
