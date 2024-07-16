import { eq } from 'drizzle-orm';

import db from '../db';
import { videoState } from '../db/schema';
import { type NewVideoState } from '../types/types';

export default class VideoStateRepository {
	static async createVideoState(data: NewVideoState) {
		const [result] = await db.insert(videoState).values(data).returning();

		return result;
	}

	static async getVideoStateById(id: string) {
		const [result] = await db
			.select()
			.from(videoState)
			.where(eq(videoState.videoId, id));

		return result;
	}

	static async updateVideoState(id: string) {
		const [result] = await db
			.update(videoState)
			.set({ status: 'TRANSCODING', updatedAt: new Date().toISOString() })
			.where(eq(videoState.videoId, id))
			.returning();

		return result;
	}
}
