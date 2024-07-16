import {
	pgEnum,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import resolution from './resolution.schema';
import video from './video.schema';

export const transcodingStatus = pgEnum('transcoding_status', [
	'PENDING',
	'IN_PROGRESS',
	'COMPLETED',
]);

const transcodingProgress = pgTable(
	'transcoding_progress',
	{
		status: transcodingStatus('status').notNull().default('PENDING'),
		createdAt: timestamp('created_at', { mode: 'string' })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'string' })
			.notNull()
			.defaultNow(),

		videoId: uuid('video_id')
			.notNull()
			.references(() => video.id),
		resolutionId: uuid('resolution_id')
			.notNull()
			.references(() => resolution.id),
	},
	(transcodingProgress) => ({
		pk: primaryKey({
			columns: [
				transcodingProgress.videoId,
				transcodingProgress.resolutionId,
			],
		}),
	})
);

export const transcodingProgressRelations = relations(
	transcodingProgress,
	({ one }) => ({
		video: one(video, {
			fields: [transcodingProgress.videoId],
			references: [video.id],
		}),
		resolution: one(resolution, {
			fields: [transcodingProgress.resolutionId],
			references: [resolution.id],
		}),
	})
);

export default transcodingProgress;
