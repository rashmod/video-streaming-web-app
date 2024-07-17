import TranscodingProgressRepository from '../repositories/transcodingProgress.repository';

export default class TranscodingProgressService {
	static async findAllByVideoId(videoId: string) {
		const transcodingProgress =
			await TranscodingProgressRepository.findAllByVideoId(videoId);
		if (!transcodingProgress) {
			throw new Error('Failed to find transcoding progress');
		}

		return transcodingProgress;
	}
}
