import { Request, Response } from 'express';

import VideoService from '../services/video.service';

export default class VideoController {
	static async getVideo(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const video = await VideoService.getVideoById(id);

		res.status(200).json({ success: true, data: video });
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

		res.status(200).json({ success: true, data: video });
	}

	static async deleteVideo(req: Request<{ id: string }>, res: Response) {
		const { id }: { id: string } = req.params;

		const video = await VideoService.deleteVideo(id);

		res.status(200).json({ success: true, data: video });
	}
}
