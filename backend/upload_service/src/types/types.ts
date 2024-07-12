import { video } from '../db/schema';

export type NewVideo = Pick<
	typeof video.$inferInsert,
	'title' | 'duration' | 'videoName' | 'thumbnailName' | 'userId'
>;
