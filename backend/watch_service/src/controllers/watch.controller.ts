import { Request, Response } from 'express';

export default async function watchController(
	req: Request<{ videoId: string }>,
	res: Response
) {
	const { videoId } = req.params;

	res.status(200).json({ message: 'Hello World!', videoId });
}
