import { eq } from 'drizzle-orm';

import db from '../db';
import { video } from '../db/schema';
import { type NewVideo } from '../types/types';

export default class VideoRepository {
	static async createVideo(data: NewVideo) {
		const [result] = await db.insert(video).values(data).returning();

		return result;
	}

	static async getVideoById(id: string) {
		const [result] = await db.select().from(video).where(eq(video.id, id));

		return result;
	}
}
