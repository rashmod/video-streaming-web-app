import db from '../db';
import { transcodingProgress } from '../db/schema';
import { NewTranscodingProgress } from '../types/types';

export default class TranscodingProgressRepository {
	static async createTranscodingProgress(data: NewTranscodingProgress) {
		const [result] = await db
			.insert(transcodingProgress)
			.values(data)
			.returning();

		return result;
	}

	static async createMultipleTranscodingProgress(
		data: NewTranscodingProgress[]
	) {
		const result = await db
			.insert(transcodingProgress)
			.values(data)
			.returning();

		return result;
	}
}
