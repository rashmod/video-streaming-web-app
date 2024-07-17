import { eq } from 'drizzle-orm';
import db from '../db';
import { uploadProgress } from '../db/schema';

export default class UploadProgressRepository {
	static async findById(id: string) {
		const [result] = await db
			.select()
			.from(uploadProgress)
			.where(eq(uploadProgress.videoId, id));

		return result;
	}
}
