import path from 'path';
import { readFileSync } from 'fs';

import S3Service from './s3.service';
import VideoRepository from '../repositories/video.repository';
import { type NewVideo } from '../types/types';
import FileService from './file.service';
import {
	AWS_S3_THUMBNAIL_PREFIX,
	AWS_S3_TRANSCODED_VIDEO_PREFIX,
} from '../constants/constants';

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
		const thumbnailName = path.join(
			AWS_S3_THUMBNAIL_PREFIX,
			path.basename(thumbnailPath)
		);
		const videoName = path.join(
			AWS_S3_TRANSCODED_VIDEO_PREFIX,
			FileService.randomName() + '.' + extension
		);

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
