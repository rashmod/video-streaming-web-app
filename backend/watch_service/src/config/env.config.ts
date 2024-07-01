import 'dotenv/config';
import { z } from 'zod';

// todo kafka topic in env

const schema = z.object({
	HOST: z.string().trim().min(1),
	PORT: z.coerce.number().int().positive(),
	NODE_ENV: z.enum(['DEVELOPMENT', 'PRODUCTION', 'TEST']),

	AWS_ACCESS_KEY: z.string().trim().min(1),
	AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),

	AWS_REGION: z.string().trim().min(1),
	AWS_BUCKET_NAME: z.string().trim().min(1),

	AWS_CLOUDFRONT_URL: z.string().trim().min(1),
	AWS_CLOUDFRONT_KEY_PAIR_ID: z.string().trim().min(1),
	AWS_CLOUDFRONT_PRIVATE_KEY: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		'❌ Invalid environment variables:',
		JSON.stringify(parsedEnv.error.format(), null, 4)
	);
	process.exit(1);
}

export default parsedEnv.data;
