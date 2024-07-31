import { Request, Response } from 'express';

import UserService from '../services/user.service';

export default class UserController {
	static async registerUser(req: Request, res: Response) {
		const {
			name,
			email,
			password,
		}: { name: string; email: string; password: string } = req.body;

		const user = await UserService.createUser({ name, email, password });

		res.status(200).json({ success: true, data: user });
	}

	static async getUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const user = await UserService.getUserById(id);

		res.status(200).json({ success: true, data: user });
	}

	static async updateUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;
		const { name = 'john wick' }: { name: string } = req.body;

		const user = await UserService.updateUser(id, { name });

		res.status(200).json({ success: true, data: user });
	}

	static async deleteUser(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const user = await UserService.deleteUser(id);

		res.status(200).json({ success: true, data: user });
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

		res.status(200).json({ success: true, data: { user, accessToken } });
	}

	static logoutUser(_req: Request, res: Response) {
		res.cookie('refreshToken', '', {
			httpOnly: true,
			secure: true,
			path: '/refresh_token',
			maxAge: 0,
		});
		res.status(200).json({ success: true, data: null });
	}
}
