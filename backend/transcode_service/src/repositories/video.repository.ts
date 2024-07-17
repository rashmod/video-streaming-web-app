import { eq } from 'drizzle-orm';

import db from '../db';
import { video } from '../db/schema';

export default class VideoRepository {
	static async findById(id: string) {
		const [result] = await db
			.select({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
			})
			.from(video)
			.where(eq(video.id, id));

		return result;
	}
}
