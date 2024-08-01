import { BadRequestError, InternalServerError, NotFoundError } from '../errors';
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
			throw new InternalServerError('Failed to create upload progress.');
		}

		return uploadProgress;
	}

	static async getUploadProgressById(id: string) {
		const uploadProgress =
			await UploadProgressRepository.getUploadProgressById(id);
		if (!uploadProgress) {
			throw new NotFoundError('Upload progress not found.');
		}

		return uploadProgress;
	}

	static async incrementUploadProgress(id: string) {
		await this.getUploadProgressById(id);

		const updatedUploadProgress =
			await UploadProgressRepository.incrementUploadProgress(id);
		if (!updatedUploadProgress) {
			throw new InternalServerError('Failed to update upload progress.');
		}

		return updatedUploadProgress;
	}

	static async checkUploadCompleted(videoId: string) {
		const uploadProgress = await this.getUploadProgressById(videoId);

		const uploadComplete =
			uploadProgress.uploadedParts === uploadProgress.totalParts;

		if (!uploadComplete) {
			throw new BadRequestError('Upload not complete.');
		}

		return {
			uploadComplete,
			uploadId: uploadProgress.uploadId,
			uploadKey: uploadProgress.uploadKey,
		};
	}
}
