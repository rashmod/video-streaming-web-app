import { readFileSync } from 'fs';
import asyncFs from 'fs/promises';

import S3Service from './s3.service';
import UploadProgressService from './uploadProgress.service';
import VideoService, { type CreateVideoRequest } from './video.service';
import VideoStateService from './videoState.service';
import KafkaService from './kafka.service';

type InitializeUploadRequest = CreateVideoRequest & { totalParts: number };

// todo check for existence before update and delete

export default class UploadService {
	static async initializeUpload({
		thumbnailPath,
		duration,
		title,
		extension,
		userId,
		totalParts,
	}: InitializeUploadRequest) {
		// todo handle everything in a transaction
		// todo delete s3 files on error

		const video = await VideoService.createVideo({
			duration,
			title,
			thumbnailPath,
			extension,
			userId,
		});

		const uploadId = await S3Service.initializeMultipartUpload(
			video.videoName
		);

		const videoState = await VideoStateService.createVideoState(video.id);
		const uploadProgress = await UploadProgressService.createUploadProgress(
			{
				totalParts,
				videoId: video.id,
				uploadKey: video.videoName,
				uploadId,
			}
		);

		return {
			video,
			videoState,
			uploadProgress,
		};
	}

	static async upload({
		partPath,
		partNumber,
		videoId,
	}: {
		partPath: string;
		partNumber: number;
		videoId: string;
	}) {
		const video = await VideoService.getVideoById(videoId);
		const uploadProgress =
			await UploadProgressService.getUploadProgressByVideoId(videoId);

		const part = readFileSync(partPath);

		const eTag = await S3Service.uploadPart({
			fileKey: video.videoName,
			uploadId: uploadProgress.uploadId,
			part,
			partNumber,
		});

		await UploadProgressService.incrementUploadProgress(uploadProgress.id);

		await asyncFs.access(partPath);
		await asyncFs.unlink(partPath);

		return eTag;
	}

	static async completeUpload({
		videoId,
		parts,
	}: {
		videoId: string;
		parts: { ETag: string; PartNumber: number }[];
	}) {
		const video = await VideoService.getVideoById(videoId);
		const uploadCompleted =
			await UploadProgressService.checkUploadCompleted(videoId);

		await S3Service.completeMultipartUpload({
			uploadId: uploadCompleted.uploadId,
			fileKey: video.videoName,
			parts,
		});

		const videoState = await VideoStateService.updateVideoState(videoId);

		await KafkaService.triggerUploadCompleteEvent(videoId);

		return videoState;
	}
}
