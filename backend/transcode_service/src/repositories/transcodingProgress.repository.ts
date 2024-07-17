import { eq } from 'drizzle-orm';
import db from '../db';
import { resolution, transcodingProgress } from '../db/schema';

export default class TranscodingProgressRepository {
	static async findAllByVideoId(videoId: string) {
		const result = await db
			.select()
			.from(transcodingProgress)
			.where(eq(transcodingProgress.videoId, videoId))
			.innerJoin(
				resolution,
				eq(resolution.id, transcodingProgress.resolutionId)
			);

		return result;
	}
}
