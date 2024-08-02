import { eq } from 'drizzle-orm';

import db from '../db';
import user from '../db/schema/user.schema';

export default class UserRepository {
	static async findById(id: string) {
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
}
