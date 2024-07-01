import { Request, Response } from 'express';
import { getSignedUrl } from '@aws-sdk/cloudfront-signer';

import envConfig from '../config/env.config';
import { WEEK } from '../constants/constants';

export default async function watchController(
	req: Request<{ videoId: string }>,
	res: Response
) {
	const { videoId } = req.params;

	// get s3 image name from video id
	const videoName =
		'1719739627413f7c8788209e850a52f9d984a623b0c364f1ff89f1e89380a5acdf79d2cb2347a_mp4';

	const policy = {
		Statement: [
			{
				Resource: `${envConfig.AWS_CLOUDFRONT_URL}/${videoName}/*`,
				Condition: {
					DateLessThan: {
						'AWS:EpochTime': Math.floor(
							(new Date().getTime() + WEEK) / 1000
						),
					},
				},
			},
		],
	};

	const customPolicy = JSON.stringify(policy);

	const signedUrl = getSignedUrl({
		policy: customPolicy,
		keyPairId: envConfig.AWS_CLOUDFRONT_KEY_PAIR_ID,
		privateKey: envConfig.AWS_CLOUDFRONT_PRIVATE_KEY,
	});

	const token = signedUrl.split('?')[1];
	const url = `${envConfig.AWS_CLOUDFRONT_URL}/${videoName}/${videoName}.m3u8`;

	res.status(200).json({
		message: 'Successfully generated signed url',
		token: '?' + token,
		url,
	});
}
