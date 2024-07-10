import { Request, Response } from 'express';

export default class VideoController {
	static async getVideo(req: Request<{ id: string }>, res: Response) {
		res.status(200).json({ success: true });
	}

	static async updateVideo(req: Request<{ id: string }>, res: Response) {
		res.status(200).json({ success: true });
	}

	static async deleteVideo(req: Request<{ id: string }>, res: Response) {
		res.status(200).json({ success: true });
	}
}
