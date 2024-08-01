import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

expand(config());

const schema = z
	.object({
		HOST: z.string().trim().min(1),
		PORT: z.coerce.number().int().positive(),
		NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION', 'TEST']),

		DB_HOST: z.string().trim().min(1),
		DB_USER: z.string().trim().min(1),
		DB_PASSWORD: z.string().trim().min(1),
		DB_NAME: z.string().trim().min(1),
		DB_PORT: z.coerce.number().int().positive(),
		DB_URL: z.string().trim().min(1),

		AWS_ACCESS_KEY: z.string().trim().min(1),
		AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),

		AWS_S3_REGION: z.string().trim().min(1),
		AWS_S3_BUCKET_NAME: z.string().trim().min(1),

		AWS_CLOUDFRONT_URL: z.string().trim().min(1),
		AWS_CLOUDFRONT_KEY_PAIR_ID: z.string().trim().min(1),
		AWS_CLOUDFRONT_PRIVATE_KEY: z.string().trim().min(1),

		JWT_ACCESS_TOKEN_SECRET: z.string().trim().min(1),
	})
	.refine(
		(data) =>
			data.DB_URL ===
			`postgresql://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}`,
		{ path: ['DB_URL'] }
	);

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'❌ Invalid environment variables:',
		JSON.stringify(parsedEnv.error.format(), null, 4)
	);
	process.exit(1);
}

export default parsedEnv.data;
