import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import video from './video.schema';

const channel = pgTable('channels', {
	id: uuid('id').defaultRandom().primaryKey(),
	name: varchar('name', { length: 255 }).notNull(),
	avatarUrl: varchar('avatar_url', { length: 255 }),
	createdAt: timestamp('created_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'string' })
		.notNull()
		.defaultNow(),
});

export const channelRelations = relations(channel, ({ many }) => ({
	videos: many(video),
}));

export default channel;
