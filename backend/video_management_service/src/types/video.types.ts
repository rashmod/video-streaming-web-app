import { video } from '../db/schema';

export type NewVideo = typeof video.$inferInsert;
