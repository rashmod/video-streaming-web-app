import { uploadProgress, video, videoState } from '../db/schema';

export type NewUploadProgress = Pick<
	typeof uploadProgress.$inferInsert,
	'uploadId' | 'videoId' | 'totalParts' | 'uploadKey'
>;

export type NewVideoState = Pick<typeof videoState.$inferInsert, 'videoId'>;

export type NewVideo = Pick<
	typeof video.$inferInsert,
	'title' | 'duration' | 'videoName' | 'thumbnailName' | 'userId'
>;
