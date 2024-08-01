import VideoRepository from '../repositories/video.repository';
import MediaService from './media.service';
import { type NewVideo } from '../types/video.types';
import { InternalServerError, NotFoundError } from '../errors';

export default class VideoService {
	static async findMany() {
		const videos = await VideoRepository.findMany();
		if (!videos) {
			throw new InternalServerError('Failed to fetch videos');
		}

		return videos;
	}

	static async getVideoById(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new NotFoundError('Video not found');
		}

		const thumbnailUrl = MediaService.getThumbnailSignedUrl(
			video.thumbnailName
		);
		const videoUrl = MediaService.getVideoSignedUrl(video.videoName);

		return { ...video, thumbnailUrl, videoUrl };
	}

	static async updateVideo(
		id: string,
		data: Pick<NewVideo, 'title' | 'thumbnailName'>
	) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new NotFoundError('Video not found');
		}

		const updatedVideo = await VideoRepository.updateVideo(id, data);
		if (!updatedVideo) {
			throw new InternalServerError('Failed to update video');
		}

		const thumbnailUrl = MediaService.getThumbnailSignedUrl(
			video.thumbnailName
		);
		const videoUrl = MediaService.getVideoSignedUrl(video.videoName);

		return { ...updatedVideo, thumbnailUrl, videoUrl };
	}

	static async deleteVideo(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new NotFoundError('Video not found');
		}

		const deletedVideo = await VideoRepository.deleteVideo(id);
		if (!deletedVideo) {
			throw new InternalServerError('Failed to delete video');
		}

		return deletedVideo;
	}
}
