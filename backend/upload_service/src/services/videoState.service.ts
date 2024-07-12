import VideoStateRepository from '../repositories/videoState.repository';
import { NewVideoState } from '../types/types';

export default class VideoStateService {
	static async createVideoState({ videoId }: NewVideoState) {
		const videoState = await VideoStateRepository.createVideoState({
			videoId,
		});

		if (!videoState) {
			throw new Error('Failed to create video state.');
		}

		return videoState;
	}

	static async updateVideoState(id: string, data: any) {
		throw new Error('Method not implemented.');
	}
}
