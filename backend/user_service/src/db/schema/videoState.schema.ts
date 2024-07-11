import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import uploadProgress from './uploadProgress.schema';
import transcodingProgress from './transcodingProgress.schema';
import video from './video.schema';

export const videoStatus = pgEnum('video_status', [
	'UPLOADING',
	'TRANSCODING',
	'COMPLETED',
]);

const videoState = pgTable('video_state', {
	id: uuid('id').defaultRandom().primaryKey(),
	status: videoStatus('status').notNull().default('UPLOADING'),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),

	videoId: uuid('video_id')
		.notNull()
		.references(() => video.id),
});

export const videoStateRelations = relations(videoState, ({ one, many }) => ({
	video: one(video, { fields: [videoState.videoId], references: [video.id] }),
}));
export default videoState;
