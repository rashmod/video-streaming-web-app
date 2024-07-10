import VideoRepository from '../repositories/video.repository';
import { NewVideo } from '../types/video.types';

export default class VideoService {
	static async getVideoById(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new Error('Video not found');
		}

		return video;
	}

	static async updateVideo(
		id: string,
		data: Pick<NewVideo, 'title' | 'thumbnailName'>
	) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new Error('Video not found');
		}

		const updatedVideo = await VideoRepository.updateVideo(id, data);
		if (!updatedVideo) {
			throw new Error('Failed to update video');
		}

		return updatedVideo;
	}

	static async deleteVideo(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new Error('Video not found');
		}

		const deletedVideo = await VideoRepository.deleteVideo(id);
		if (!deletedVideo) {
			throw new Error('Failed to delete video');
		}

		return deletedVideo;
	}
}
