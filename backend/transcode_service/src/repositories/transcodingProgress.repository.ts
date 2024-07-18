import { and, eq } from 'drizzle-orm';
import db from '../db';
import { resolution, transcodingProgress } from '../db/schema';
import { UpdateTranscodingProgressStatus } from '../types/types';

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

	static async update({
		videoId,
		resolutionId,
		status,
	}: UpdateTranscodingProgressStatus) {
		const [result] = await db
			.update(transcodingProgress)
			.set({ status, updatedAt: new Date().toISOString() })
			.where(
				and(
					eq(transcodingProgress.videoId, videoId),
					eq(transcodingProgress.resolutionId, resolutionId)
				)
			)
			.returning();

		return result;
	}
}
