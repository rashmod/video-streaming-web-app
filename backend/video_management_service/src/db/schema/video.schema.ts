import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import user from './user.schema';

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

export const videoRelations = relations(video, ({ one }) => ({
	user: one(user, {
		fields: [video.userId],
		references: [user.id],
	}),
}));

export default video;
