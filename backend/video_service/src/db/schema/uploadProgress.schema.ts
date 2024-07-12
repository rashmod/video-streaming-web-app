import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import videoState from './videoState.schema';
import video from './video.schema';

const uploadProgress = pgTable('upload_progress', {
	id: uuid('id').defaultRandom().primaryKey(),
	uploadId: varchar('upload_id', { length: 255 }).notNull(),
	totalParts: integer('total_parts').notNull(),
	uploadedParts: integer('uploaded_parts').notNull().default(0),
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

export const uploadProgressRelations = relations(uploadProgress, ({ one }) => ({
	video: one(video, {
		fields: [uploadProgress.videoId],
		references: [video.id],
	}),
}));

export default uploadProgress;
