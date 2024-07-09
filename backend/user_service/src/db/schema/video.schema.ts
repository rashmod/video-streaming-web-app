import {
	integer,
	pgTable,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import channel from './channel.schema';

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

	channelId: uuid('channel_id')
		.notNull()
		.references(() => channel.id),
});

export const videoRelations = relations(video, ({ one }) => ({
	channel: one(channel, {
		fields: [video.channelId],
		references: [channel.id],
	}),
}));

export default video;
