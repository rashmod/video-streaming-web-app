import TranscodingProgressRepository from '../repositories/transcodingProgress.repository';
import { UpdateTranscodingProgressStatus } from '../types/types';

export default class TranscodingProgressService {
	static async findAllByVideoId(videoId: string) {
		const transcodingProgress =
			await TranscodingProgressRepository.findAllByVideoId(videoId);
		if (!transcodingProgress) {
			throw new Error('Failed to find transcoding progress');
		}

		return transcodingProgress;
	}

	static async update({
		videoId,
		resolutionId,
		status,
	}: UpdateTranscodingProgressStatus) {
		const transcodingProgress = await TranscodingProgressRepository.update({
			videoId,
			resolutionId,
			status,
		});
		if (!transcodingProgress) {
			throw new Error('Failed to update transcoding progress');
		}

		return transcodingProgress;
	}
}
