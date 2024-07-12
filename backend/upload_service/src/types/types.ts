import { video, videoState } from '../db/schema';

export type NewVideoState = Pick<typeof videoState.$inferInsert, 'videoId'>;

export type NewVideo = Pick<
	typeof video.$inferInsert,
	'title' | 'duration' | 'videoName' | 'thumbnailName' | 'userId'
>;
