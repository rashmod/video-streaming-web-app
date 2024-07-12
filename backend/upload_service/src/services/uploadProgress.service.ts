import UploadProgressRepository from '../repositories/uploadProgress.repository';
import { type NewUploadProgress } from '../types/types';

export default class UploadProgressService {
	static async createUploadProgress({
		totalParts,
		videoId,
		uploadId,
	}: NewUploadProgress) {
		const uploadProgress =
			await UploadProgressRepository.createUploadProgress({
				totalParts,
				videoId,
				uploadId,
			});

		if (!uploadProgress) {
			throw new Error('Failed to create upload progress.');
		}

		return uploadProgress;
	}

	static async getUploadProgressByVideoId(videoId: string) {
		const uploadProgress =
			await UploadProgressRepository.getUploadProgressByVideoId(videoId);

		if (!uploadProgress) {
			throw new Error('Upload progress not found.');
		}

		return uploadProgress;
	}

	static async incrementUploadProgress(id: string) {
		const uploadProgress =
			await UploadProgressRepository.incrementUploadProgress(id);

		if (!uploadProgress) {
			throw new Error('Failed to update upload progress.');
		}

		return uploadProgress;
	}

	static async checkUploadCompleted(videoId: string) {
		const uploadProgress =
			await UploadProgressRepository.getUploadProgressByVideoId(videoId);

		if (!uploadProgress) {
			throw new Error('Upload progress not found.');
		}

		const uploadComplete =
			uploadProgress.uploadedParts === uploadProgress.totalParts;

		if (!uploadComplete) {
			throw new Error('Upload not completed.');
		}

		return {
			uploadComplete,
			uploadId: uploadProgress.uploadId,
		};
	}
}
