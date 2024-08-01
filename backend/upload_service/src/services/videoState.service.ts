import { InternalServerError, NotFoundError } from '../errors';
import VideoStateRepository from '../repositories/videoState.repository';

export default class VideoStateService {
	static async createVideoState(videoId: string) {
		const videoState = await VideoStateRepository.createVideoState({
			videoId,
		});
		if (!videoState) {
			throw new InternalServerError('Failed to create video state.');
		}

		return videoState;
	}

	static async getVideoStateById(id: string) {
		const videoState = await VideoStateRepository.getVideoStateById(id);
		if (!videoState) {
			throw new NotFoundError('Video state not found.');
		}

		return videoState;
	}

	static async updateVideoState(videoId: string) {
		await this.getVideoStateById(videoId);

		const updatedVideoState = await VideoStateRepository.updateVideoState(
			videoId
		);
		if (!updatedVideoState) {
			throw new InternalServerError('Failed to update video state.');
		}

		return updatedVideoState;
	}
}
