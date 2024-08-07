import fs from 'fs';
import asyncFs from 'fs/promises';

import S3Service from './s3.service';
import UploadProgressService from './uploadProgress.service';
import VideoService, { type CreateVideoRequest } from './video.service';
import VideoStateService from './videoState.service';
import KafkaService from './kafka.service';
import TranscodingProgressService from './transcodingProgress.service';
import FileService from './file.service';

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

		const uploadKey = FileService.getFileName({
			fileName: video.videoName,
			type: 'original',
			media: 'video',
		});

		const uploadId = await S3Service.initializeMultipartUpload(uploadKey);

		const videoState = await VideoStateService.createVideoState(video.id);
		const uploadProgress = await UploadProgressService.createUploadProgress(
			{
				totalParts,
				videoId: video.id,
				uploadKey,
				uploadId,
			}
		);

		await FileService.deleteFile(thumbnailPath);

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
		await VideoService.getVideoById(videoId);
		const uploadProgress =
			await UploadProgressService.getUploadProgressById(videoId);

		const part = fs.readFileSync(partPath);

		const eTag = await S3Service.uploadPart({
			fileKey: uploadProgress.uploadKey,
			uploadId: uploadProgress.uploadId,
			part,
			partNumber,
		});

		await UploadProgressService.incrementUploadProgress(
			uploadProgress.videoId
		);

		await asyncFs.access(partPath);
		await asyncFs.unlink(partPath);

		return eTag;
	}

	static async completeUpload({
		videoId,
		parts,
		resolution,
	}: {
		videoId: string;
		parts: { ETag: string; PartNumber: number }[];
		resolution: { height: number; width: number };
	}) {
		await VideoService.getVideoById(videoId);
		const uploadCompleted =
			await UploadProgressService.checkUploadCompleted(videoId);

		await S3Service.completeMultipartUpload({
			uploadId: uploadCompleted.uploadId,
			fileKey: uploadCompleted.uploadKey,
			parts,
		});

		const videoState = await VideoStateService.updateVideoState(videoId);

		await TranscodingProgressService.createTranscodingProgressForAllResolutions(
			{ videoId, originalResolution: resolution }
		);

		await KafkaService.triggerUploadCompleteEvent(videoId);

		const videoDir = FileService.getMediaDirectory({
			media: 'video',
			videoId,
		});
		await FileService.deleteDirectory(videoDir);

		return videoState;
	}
}
