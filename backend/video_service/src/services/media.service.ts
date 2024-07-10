import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getSignedUrlS3 } from '@aws-sdk/s3-request-presigner';
import { getSignedUrl as getSignedUrlCloudFront } from '@aws-sdk/cloudfront-signer';

import s3Client from '../config/s3.config';
import envConfig from '../config/env.config';
import { WEEK } from '../constants/constants';

export default class MediaService {
	static async uploadThumbnail(file: any) {
		throw new Error('Method not implemented.');
	}

	static async getThumbnailSignedUrl(fileKey: string) {
		const command = new GetObjectCommand({
			Bucket: envConfig.AWS_S3_BUCKET_NAME,
			Key: fileKey,
		});

		const url = await getSignedUrlS3(s3Client, command, {
			expiresIn: WEEK,
		});

		return url;
	}

	static async getVideoSignedUrl(fileKey: string) {
		const policy = {
			Statement: [
				{
					Resource: `${envConfig.AWS_CLOUDFRONT_URL}/${fileKey}/*`,
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

		const signedUrl = getSignedUrlCloudFront({
			policy: customPolicy,
			keyPairId: envConfig.AWS_CLOUDFRONT_KEY_PAIR_ID,
			privateKey: envConfig.AWS_CLOUDFRONT_PRIVATE_KEY,
		});

		const [_, token] = signedUrl.split('?');
		const url = `${envConfig.AWS_CLOUDFRONT_URL}/${fileKey}/${fileKey}.m3u8`;

		return { url, token: '?' + token };
	}
}
