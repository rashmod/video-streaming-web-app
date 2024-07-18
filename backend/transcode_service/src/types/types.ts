import { resolution, transcodingProgress } from '../db/schema';

export type TranscodingProgressStatus = Exclude<
	Required<Pick<typeof transcodingProgress.$inferInsert, 'status'>>['status'],
	'PENDING'
>;
export type TranscodingProgressId = Pick<
	typeof transcodingProgress.$inferInsert,
	'videoId' | 'resolutionId'
>;
export type UpdateTranscodingProgressStatus = TranscodingProgressId & {
	status: TranscodingProgressStatus;
};

export type Resolution = Pick<
	typeof resolution.$inferInsert,
	'name' | 'height' | 'width' | 'videoBitrate' | 'audioBitrate'
>;
