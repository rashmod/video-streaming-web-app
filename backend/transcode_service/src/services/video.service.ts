import VideoRepository from '../repositories/video.repository';

export default class VideoService {
	static async findById(id: string) {
		const video = await VideoRepository.findById(id);
		if (!video) {
			throw new Error('Video not found');
		}

		return video;
	}
}
