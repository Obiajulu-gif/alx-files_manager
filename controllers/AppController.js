import redisClient from "../utils/redis.js";
import dbClient from "../utils/db.js";

class AppController {
	static getStatus(req, res) {
		// Check if Redis and DB are alive
		const status = {
			redis: redisClient.isAlive(),
			db: dbClient.isAlive(),
		};
		return res.status(200).json(status);
	}

	static async getStats(req, res) {
		try {
			// Get the count of users and files from the DB
			const users = await dbClient.nbUsers();
			const files = await dbClient.nbFiles();
			const stats = { users, files };
			return res.status(200).json(stats);
		} catch (error) {
			return res.status(500).json({ error: "Unable to retrieve stats" });
		}
	}
}

export default AppController;
