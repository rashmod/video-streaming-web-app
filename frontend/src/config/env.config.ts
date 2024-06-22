import { z } from 'zod';

const schema = z.object({
	VITE_UPLOAD_SERVICE_API_URL: z.string().trim().min(1),
	VITE_WATCH_SERVICE_API_URL: z.string().trim().min(1),
});

const parsedEnv = schema.safeParse(import.meta.env);

if (!parsedEnv.success) {
	const error = JSON.stringify(parsedEnv.error.format(), null, 4);
	console.error('❌ Invalid environment variables:', error);
	throw new Error('❌ Invalid environment variables:' + error);
}

export default parsedEnv.data;
