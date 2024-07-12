import path from 'path';
import { readFileSync } from 'fs';

import S3Service from './s3.service';
import VideoRepository from '../repositories/video.repository';
import randomName from '../utilities/randomName';
import { type NewVideo } from '../types/types';

export type CreateVideoRequest = Omit<
	NewVideo,
	'videoName' | 'thumbnailName'
> & {
	thumbnailPath: string;
	extension: string;
};

export default class VideoService {
	static async createVideo({
		thumbnailPath,
		duration,
		extension,
		title,
		userId,
	}: CreateVideoRequest) {
		const thumbnail = readFileSync(thumbnailPath);
		const thumbnailName = path.basename(thumbnailPath);
		const videoName = randomName() + '.' + extension;

		const video = await VideoRepository.createVideo({
			title,
			duration,
			videoName,
			thumbnailName,
			userId,
		});

		if (!video) {
			throw new Error('Failed to create video.');
		}

		await S3Service.uploadImage(thumbnail, thumbnailName);

		return video;
	}

	static async getVideoById(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new Error('Video not found.');
		}

		return video;
	}
}
