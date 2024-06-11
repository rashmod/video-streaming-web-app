import { S3Client } from '@aws-sdk/client-s3';
import { ok } from 'assert';

const AWS_REGION = process.env.AWS_REGION;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

ok(AWS_REGION, 'AWS_REGION is not in the .env file');
ok(AWS_ACCESS_KEY, 'AWS_ACCESS_KEY is not in the .env file');
ok(AWS_SECRET_ACCESS_KEY, 'AWS_SECRET_ACCESS_KEY is not in the .env file');

const client = new S3Client({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

export default client;
