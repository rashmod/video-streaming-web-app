import { Request, Response } from 'express';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import s3Client from '../config/s3.config';
import envConfig from '../config/env.config';
import { WEEK } from '../constants/constants';

export default async function watchController(
	req: Request<{ videoId: string }>,
	res: Response
) {
	const { videoId } = req.params;

	// get s3 image name from video id

	const videoName =
		'1718964827386f9b69cbb38b980af49400fb93d3fbbb61f5dc1c874379324f3df98e93f96af93.mp4';

	const command = new GetObjectCommand({
		Bucket: envConfig.AWS_BUCKET_NAME,
		Key: videoName,
	});

	const url = await getSignedUrl(s3Client, command, { expiresIn: WEEK });

	res.status(200).json({ message: 'Successfully generated signed url', url });
}
