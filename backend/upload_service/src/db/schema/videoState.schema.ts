import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import uploadProgress from './uploadProgress.schema';
import transcodingProgress from './transcodingProgress.schema';

export const videoStatus = pgEnum('video_status', [
	'UPLOADING',
	'TRANSCODING',
	'COMPLETED',
]);

const videoState = pgTable('video_state', {
	id: uuid('id').defaultRandom().primaryKey(),
	videoId: uuid('video_id').notNull().unique(),
	status: videoStatus('status').notNull().default('UPLOADING'),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
});

export const videoStateRelations = relations(videoState, ({ one, many }) => ({
	uploading: one(uploadProgress, {
		fields: [videoState.videoId],
		references: [uploadProgress.videoId],
	}),
	transcoding: many(transcodingProgress),
}));

export default videoState;
