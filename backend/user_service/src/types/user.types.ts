import { user } from '../db/schema';

export type NewUser = typeof user.$inferInsert;
