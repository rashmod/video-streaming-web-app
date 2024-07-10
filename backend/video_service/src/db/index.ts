import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import envConfig from '../config/env.config';
import * as schema from './schema';

export const connection = postgres(envConfig.DB_URL);

const db = drizzle(connection, { schema, logger: true });

export default db;
