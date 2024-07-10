import { eq } from 'drizzle-orm';

import db from '../db';
import user from '../db/schema/user.schema';
import { NewUser } from '../types/user.types';

export default class UserRepository {
	static async createUser(data: NewUser) {
		const [result] = await db.insert(user).values(data).returning({
			id: user.id,
			name: user.name,
			email: user.email,
			avatarUrl: user.avatarUrl,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
		return result;
	}

	static async getUserById(id: string) {
		const [result] = await db
			.select({
				id: user.id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			})
			.from(user)
			.where(eq(user.id, id));
		return result;
	}

	static async getUserByEmail(email: string) {
		const [result] = await db
			.select({
				id: user.id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			})
			.from(user)
			.where(eq(user.email, email));
		return result;
	}

	static async updateUser(id: string, data: Pick<NewUser, 'name'>) {
		const [result] = await db
			.update(user)
			.set({ ...data, updatedAt: new Date().toISOString() })
			.where(eq(user.id, id))
			.returning({
				id: user.id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		return result;
	}

	static async deleteUser(id: string) {
		const [result] = await db
			.delete(user)
			.where(eq(user.id, id))
			.returning({
				id: user.id,
				name: user.name,
				email: user.email,
				avatarUrl: user.avatarUrl,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		return result;
	}
}
