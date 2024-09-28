import { createClient } from "redis";
import { promisify } from "util";

class RedisClient {
	constructor() {
		this.client = createClient({
			url: "redis://localhost:6379", // Add the correct Redis server URL
		});
		this.client.on("error", (err) => console.error("Redis Client Error:", err));
		this.isClientConnected = true;
		// Promisifying Redis commands for async/await usage
		this.getAsync = promisify(this.client.get).bind(this.client);
		this.setAsync = promisify(this.client.set).bind(this.client);
		this.delAsync = promisify(this.client.del).bind(this.client);
	}

	isAlive() {
		return this.isClientConnected;
	}

	async get(key) {
		try {
			const value = await this.getAsync(key);
			return value;
		} catch (err) {
			console.error("Redis GET Error:", err);
			return null;
		}
	}

	async set(key, value, duration) {
		try {
			await this.setAsync(key, value, "EX", duration);
		} catch (err) {
			console.error("Redis SET Error:", err);
		}
	}

	async del(key) {
		try {
			await this.delAsync(key);
		} catch (err) {
			console.error("Redis DEL Error:", err);
		}
	}
}

const redisClient = new RedisClient();
export default redisClient;
