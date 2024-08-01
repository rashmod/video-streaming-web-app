import { S3Client } from '@aws-sdk/client-s3';

import envConfig from './env.config';

const s3Client = new S3Client({
	region: envConfig.AWS_S3_REGION,
	credentials: {
		accessKeyId: envConfig.AWS_ACCESS_KEY,
		secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
	},
});

export default s3Client;
