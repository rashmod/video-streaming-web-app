import UserRepository from '../repositories/user.repository';
import { NewUser } from '../types/user.types';
import AuthService from './auth.service';
import {
	ConflictError,
	InternalServerError,
	NotFoundError,
	UnauthorizedError,
} from '../errors';

export default class UserService {
	static async createUser(data: NewUser) {
		const { email } = data;

		const existingUser = await UserRepository.getUserByEmail(email);
		if (existingUser) {
			throw new ConflictError('User already exists');
		}

		const hashedPassword = AuthService.hashPassword(data.password);

		const user = await UserRepository.createUser({
			...data,
			password: hashedPassword,
		});
		if (!user) {
			throw new InternalServerError('Failed to create user');
		}

		const accessToken = AuthService.signToken({ id: user.id }, 'access');
		const refreshToken = AuthService.signToken({ id: user.id }, 'refresh');

		return { user, accessToken, refreshToken };
	}

	static async getUserById(id: string) {
		const user = await UserRepository.getUserById(id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		return user;
	}

	static async updateUser(id: string, data: Pick<NewUser, 'name'>) {
		const user = await UserRepository.getUserById(id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		const updatedUser = await UserRepository.updateUser(id, data);
		if (!updatedUser) {
			throw new InternalServerError('Failed to update user');
		}

		return updatedUser;
	}

	static async deleteUser(id: string) {
		const user = await UserRepository.getUserById(id);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		const deletedUser = await UserRepository.deleteUser(id);
		if (!deletedUser) {
			throw new InternalServerError('Failed to delete user');
		}

		return deletedUser;
	}

	static async loginUser(email: string, password: string) {
		const user = await UserRepository.getUserByEmail(email);
		if (!user) {
			throw new NotFoundError('User not found');
		}

		const isPasswordValid = AuthService.comparePassword(
			password,
			user.password
		);
		if (!isPasswordValid) {
			throw new UnauthorizedError('Invalid password');
		}

		const accessToken = AuthService.signToken({ id: user.id }, 'access');
		const refreshToken = AuthService.signToken({ id: user.id }, 'refresh');

		return { user, accessToken, refreshToken };
	}
}
