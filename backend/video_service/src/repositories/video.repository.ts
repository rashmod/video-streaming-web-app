import { eq } from 'drizzle-orm';

import db from '../db';
import { user, video } from '../db/schema';
import { type NewVideo } from '../types/video.types';

export default class VideoRepository {
	static async findMany() {
		const result = await db
			.select({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
				userId: video.userId,
				name: user.name,
				avatarUrl: user.avatarUrl,
			})
			.from(video)
			.innerJoin(user, eq(video.userId, user.id));

		return result;
	}

	static async getVideoById(id: string) {
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

	static async updateVideo(
		id: string,
		data: Pick<NewVideo, 'title' | 'thumbnailName'>
	) {
		const [result] = await db
			.update(video)
			.set({ ...data, updatedAt: new Date().toISOString() })
			.where(eq(video.id, id))
			.returning({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
			});

		return result;
	}

	static async deleteVideo(id: string) {
		const [result] = await db
			.delete(video)
			.where(eq(video.id, id))
			.returning({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
			});

		return result;
	}
}
