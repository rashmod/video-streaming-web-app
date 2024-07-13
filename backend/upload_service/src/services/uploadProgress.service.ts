import UploadProgressRepository from '../repositories/uploadProgress.repository';
import { type NewUploadProgress } from '../types/types';

export default class UploadProgressService {
	static async createUploadProgress({
		totalParts,
		videoId,
		uploadId,
		uploadKey,
	}: NewUploadProgress) {
		const uploadProgress =
			await UploadProgressRepository.createUploadProgress({
				totalParts,
				videoId,
				uploadId,
				uploadKey,
			});

		if (!uploadProgress) {
			throw new Error('Failed to create upload progress.');
		}

		return uploadProgress;
	}

	static async getUploadProgressById(id: string) {
		const uploadProgress =
			await UploadProgressRepository.getUploadProgressById(id);
		if (!uploadProgress) {
			throw new Error('Upload progress not found.');
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
		await this.getUploadProgressById(id);

		const updatedUploadProgress =
			await UploadProgressRepository.incrementUploadProgress(id);
		if (!updatedUploadProgress) {
			throw new Error('Failed to update upload progress.');
		}

		return updatedUploadProgress;
	}

	static async checkUploadCompleted(videoId: string) {
		const uploadProgress = await this.getUploadProgressByVideoId(videoId);

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
