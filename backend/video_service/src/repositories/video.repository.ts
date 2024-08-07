import { and, eq } from 'drizzle-orm';

import db from '../db';
import { user, video, videoState } from '../db/schema';
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
			.innerJoin(user, eq(video.userId, user.id))
			.innerJoin(videoState, eq(video.id, videoState.videoId))
			.where(eq(videoState.status, 'COMPLETED'));

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
				userId: video.userId,
			})
			.from(video)
			.where(eq(video.id, id));

		return result;
	}

	static async getUserVideos(userId: string) {
		const result = await db
			.select({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
			})
			.from(video)
			.innerJoin(videoState, eq(video.id, videoState.videoId))
			.where(
				and(
					eq(video.userId, userId),
					eq(videoState.status, 'COMPLETED')
				)
			);

		return result;
	}

	static async getMyVideos(userId: string) {
		const result = await db
			.select({
				id: video.id,
				title: video.title,
				duration: video.duration,
				thumbnailName: video.thumbnailName,
				videoName: video.videoName,
				createdAt: video.createdAt,
				status: videoState.status,
			})
			.from(video)
			.innerJoin(videoState, eq(video.id, videoState.videoId))
			.where(and(eq(video.userId, userId)));

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
