import { eq, sql } from 'drizzle-orm';

import db from '../db';
import { uploadProgress } from '../db/schema';
import { type NewUploadProgress } from '../types/types';

export default class UploadProgressRepository {
	static async createUploadProgress(data: NewUploadProgress) {
		const [result] = await db
			.insert(uploadProgress)
			.values(data)
			.returning();

		return result;
	}

	static async getUploadProgressById(id: string) {
		const [result] = await db
			.select()
			.from(uploadProgress)
			.where(eq(uploadProgress.id, id));

		return result;
	}

	static async updateUploadProgress(id: string) {
		const [result] = await db
			.update(uploadProgress)
			.set({
				uploadedParts: sql`${uploadProgress.uploadedParts} + 1`,
				updatedAt: new Date().toISOString(),
			})
			.where(eq(uploadProgress.id, id))
			.returning();

		return result;
	}
}
