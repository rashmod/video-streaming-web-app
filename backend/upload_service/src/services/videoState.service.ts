import VideoStateRepository from '../repositories/videoState.repository';

export default class VideoStateService {
	static async createVideoState(videoId: string) {
		const videoState = await VideoStateRepository.createVideoState({
			videoId,
		});
		if (!videoState) {
			throw new Error('Failed to create video state.');
		}

		return videoState;
	}

	static async updateVideoState(videoId: string) {
		const videoState = await VideoStateRepository.updateVideoState(videoId);
		if (!videoState) {
			throw new Error('Failed to update video state.');
		}

		return videoState;
	}
}
