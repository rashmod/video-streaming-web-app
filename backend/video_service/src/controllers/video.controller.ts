import { Request, Response } from 'express';

import VideoService from '../services/video.service';
import ServiceResponse from '../http/ServiceResponse';
import handleServiceResponse from '../http/handleServiceResponse';

export default class VideoController {
	static async findMany(req: Request, res: Response) {
		const videos = await VideoService.findMany();

		const response = ServiceResponse.success({
			data: videos,
			message: 'Videos fetched successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async getUserVideos(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const videos = await VideoService.getUserVideos(id);

		const response = ServiceResponse.success({
			data: videos,
			message: 'User videos fetched successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async getMyVideos(req: Request, res: Response) {
		const userId = req.userId;

		const videos = await VideoService.getMyVideos(userId);

		const response = ServiceResponse.success({
			data: videos,
			message: 'My videos fetched successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async getVideo(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const video = await VideoService.getVideoById(id);

		const response = ServiceResponse.success({
			data: video,
			message: 'Video fetched successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async updateVideo(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;
		const {
			title,
			thumbnailName,
		}: { title: string; thumbnailName: string } = req.body;

		const video = await VideoService.updateVideo(id, {
			title,
			thumbnailName,
		});

		const response = ServiceResponse.success({
			data: video,
			message: 'Video updated successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}

	static async deleteVideo(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const video = await VideoService.deleteVideo(id);

		const response = ServiceResponse.success({
			data: video,
			message: 'Video deleted successfully',
			statusCode: 200,
		});
		handleServiceResponse(res, response);
	}
}
