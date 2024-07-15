import ResolutionRepository from '../repositories/resolution.repository';
import TranscodingProgressRepository from '../repositories/transcodingProgress.repository';
import { NewTranscodingProgress } from '../types/types';

export default class TranscodingProgressService {
	// create a method to create transcoding progress for all resolutions
	static async createTranscodingProgressForAllResolutions({
		videoId,
		originalResolution,
	}: {
		videoId: string;
		originalResolution: { height: number; width: number };
	}) {
		const resolutions = await ResolutionRepository.getAllResolutions();

		let transcodeResolutions: NewTranscodingProgress[] = [];
		resolutions.forEach((resolution) => {
			if (
				resolution.width > originalResolution.width ||
				resolution.height > originalResolution.height
			)
				return;

			transcodeResolutions.push({
				videoId,
				resolutionId: resolution.id,
			});
		});

		await TranscodingProgressRepository.createMultipleTranscodingProgress(
			transcodeResolutions
		);
	}

	static async createTranscodingProgress(data: NewTranscodingProgress) {
		const transcodingProgress =
			await TranscodingProgressRepository.createTranscodingProgress(data);

		if (!transcodingProgress) {
			throw new Error('Failed to create transcoding progress');
		}

		return transcodingProgress;
	}
}
