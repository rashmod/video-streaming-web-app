import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import video from './video.schema';

export const videoStatus = pgEnum('video_status', [
	'UPLOADING',
	'TRANSCODING',
	'COMPLETED',
]);

const videoState = pgTable('video_state', {
	status: videoStatus('status').notNull().default('UPLOADING'),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),

	videoId: uuid('video_id')
		.notNull()
		.primaryKey()
		.references(() => video.id),
});

export const videoStateRelations = relations(videoState, ({ one, many }) => ({
	video: one(video, { fields: [videoState.videoId], references: [video.id] }),
}));

export default videoState;
