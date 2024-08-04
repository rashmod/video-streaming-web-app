import VideoRepository from '../repositories/video.repository';
import MediaService from './media.service';
import { type NewVideo } from '../types/video.types';
import { InternalServerError, NotFoundError } from '../errors';
import UserService from './user.service';

export default class VideoService {
	static async findMany() {
		const videos = await VideoRepository.findMany();
		if (!videos) {
			throw new InternalServerError('Failed to fetch videos');
		}

		const videosWithUrls = Promise.all(
			videos.map(async (video) => {
				const thumbnailUrl = await MediaService.getImageSignedUrl(
					video.thumbnailName
				);

				const avatarUrl = await (async () => {
					if (!video.avatarUrl) return null;
					return await MediaService.getImageSignedUrl(
						video.avatarUrl
					);
				})();

				return { ...video, thumbnailUrl, avatarUrl };
			})
		);

		return videosWithUrls;
	}

	static async getVideoById(id: string) {
		const video = await VideoRepository.getVideoById(id);
		if (!video) {
			throw new NotFoundError('Video not found');
		}

		const user = await UserService.findById(video.userId);

		const avatarUrl = await (async () => {
			if (!user.avatarUrl) return null;
			return await MediaService.getImageSignedUrl(user.avatarUrl);
		})();

		const thumbnailUrl = await MediaService.getImageSignedUrl(
			video.thumbnailName
		);
		const videoUrl = await MediaService.getVideoSignedUrl(video.videoName);

		return {
			video: { ...video, thumbnailUrl, videoUrl },
			user: { ...user, avatarUrl },
		};
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

		const thumbnailUrl = MediaService.getImageSignedUrl(
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
