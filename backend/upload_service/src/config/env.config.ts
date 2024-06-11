import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
	HOST: z.string().trim().min(1).default('localhost'),
	PORT: z.coerce.number().int().positive().default(3001),
	NODE_ENV: z
		.enum(['development', 'production', 'test'])
		.default('development'),

	AWS_ACCESS_KEY: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_REGION: z.string(),
	AWS_BUCKET_NAME: z.string(),
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
