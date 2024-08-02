import UserRepository from '../repositories/user.repository';
import { NotFoundError } from '../errors';

export default class UserService {
	static async findById(id: string) {
		const user = await UserRepository.findById(id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		return user;
	}
}
