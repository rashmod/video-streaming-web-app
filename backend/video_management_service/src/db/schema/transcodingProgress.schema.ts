import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import videoState from './videoState.schema';
import resolution from './resolution.schema';

export const transcodingStatus = pgEnum('transcoding_status', [
	'PENDING',
	'IN_PROGRESS',
	'COMPLETED',
]);

const transcodingProgress = pgTable('transcoding_progress', {
	id: uuid('id').defaultRandom().primaryKey(),
	status: transcodingStatus('status').notNull().default('PENDING'),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),

	videoId: uuid('video_id')
		.notNull()
		.references(() => videoState.videoId),
	resolutionId: uuid('resolution_id')
		.notNull()
		.references(() => resolution.id),
});

export const transcodingProgressRelations = relations(
	transcodingProgress,
	({ one }) => ({
		videoState: one(videoState, {
			fields: [transcodingProgress.videoId],
			references: [videoState.videoId],
		}),
		resolution: one(resolution, {
			fields: [transcodingProgress.resolutionId],
			references: [resolution.id],
		}),
	})
);

export default transcodingProgress;
