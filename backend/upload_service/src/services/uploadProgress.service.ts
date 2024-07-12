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
}
