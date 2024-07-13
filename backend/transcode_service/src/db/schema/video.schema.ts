import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import user from './user.schema';
import videoState from './videoState.schema';
import uploadProgress from './uploadProgress.schema';
import transcodingProgress from './transcodingProgress.schema';

const video = pgTable('video', {
	id: uuid('id').defaultRandom().primaryKey(),
	title: varchar('title', { length: 255 }).notNull(),
	duration: integer('duration').notNull(),
	thumbnailName: varchar('thumbnail_name', { length: 255 }).notNull(),
	videoName: varchar('video_name', { length: 255 }).notNull(),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),

	userId: uuid('user_id')
		.notNull()
		.references(() => user.id),
});

export const videoRelations = relations(video, ({ one, many }) => ({
	user: one(user, {
		fields: [video.userId],
		references: [user.id],
	}),
	videoState: one(videoState, {
		fields: [video.id],
		references: [videoState.videoId],
	}),
	uploadingProgress: one(uploadProgress, {
		fields: [video.id],
		references: [uploadProgress.videoId],
	}),
	transcodingProgress: many(transcodingProgress),
}));

export default video;
