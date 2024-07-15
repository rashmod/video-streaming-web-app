import db from '../db';
import { resolution } from '../db/schema';

export default class ResolutionRepository {
	static async getAllResolutions() {
		const result = await db.select().from(resolution);

		return result;
	}
}
