import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';

expand(config());

const stringBoolean = z.coerce
	.string()
	.transform((val) => {
		return val === 'true';
	})
	.default('false');

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

		POSTGRES_USER: z.string().trim().min(1),
		POSTGRES_PASSWORD: z.string().trim().min(1),
		POSTGRES_DB: z.string().trim().min(1),
	})
	.refine(
		(data) =>
			data.DB_URL ===
			`postgresql://${data.DB_USER}:${data.DB_PASSWORD}@${data.DB_HOST}:${data.DB_PORT}/${data.DB_NAME}`,
		{ path: ['DB_URL'] }
	)
	.refine((data) => data.DB_USER === data.POSTGRES_USER, {
		path: ['DB_USER', 'POSTGRES_USER'],
	})
	.refine((data) => data.DB_PASSWORD === data.POSTGRES_PASSWORD, {
		path: ['DB_PASSWORD', 'POSTGRES_PASSWORD'],
	})
	.refine((data) => data.DB_NAME === data.POSTGRES_DB, {
		path: ['DB_NAME', 'POSTGRES_DB'],
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
