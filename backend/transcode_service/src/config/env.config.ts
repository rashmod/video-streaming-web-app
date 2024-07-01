import 'dotenv/config';
import { z } from 'zod';

// todo kafka topic in env

const schema = z.object({
	AWS_ACCESS_KEY: z.string().trim().min(1),
	AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),

	AWS_REGION: z.string().trim().min(1),
	AWS_BUCKET_NAME: z.string().trim().min(1),

	KAFKA_CLIENT_ID: z.string().trim().min(1),
	KAFKA_BROKER: z.string().trim().min(1),
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
