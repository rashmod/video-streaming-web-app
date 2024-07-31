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
}
