import { Request, Response } from 'express';

export default class UserController {
	static async registerUser(req: Request, res: Response) {
		res.status(200).json({ message: 'Registered successfully' });
	}

	static async getUser(req: Request, res: Response) {
		res.status(200).json({ message: 'Fetched successfully' });
	}

	static async updateUser(req: Request, res: Response) {
		res.status(200).json({ message: 'Updated successfully' });
	}

	static async deleteUser(req: Request, res: Response) {
		res.status(200).json({ message: 'Deleted successfully' });
	}
}
