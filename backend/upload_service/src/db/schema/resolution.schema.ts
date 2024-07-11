import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	timestamp,
	unique,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';
import transcodingProgress from './transcodingProgress.schema';

const resolution = pgTable(
	'resolution',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		name: varchar('name', { length: 255 }).notNull().unique(),
		width: integer('width').notNull(),
		height: integer('height').notNull(),
		videoBitrate: varchar('video_bitrate', { length: 20 }).notNull(),
		audioBitrate: varchar('audio_bitrate', { length: 20 }).notNull(),
		createdAt: timestamp('created_at', { mode: 'string' })
			.notNull()
			.defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'string' })
			.notNull()
			.defaultNow(),
	},
	(resolutions) => ({
		width_height: unique().on(resolutions.width, resolutions.height),
	})
);

export const resolutionRelations = relations(resolution, ({ many }) => ({
	transcodingProgress: many(transcodingProgress),
}));

export default resolution;
