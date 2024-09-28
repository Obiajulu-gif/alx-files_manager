import { createClient } from "redis";
import { promisify } from "util";
/**
 * Represents a Redis client.
 */
class RedisClient {
	constructor() {
		this.client = createClient();
		this.isClientConnected = true;
		this.client.on("error", (err) => {
			console.error(
				"Redis client failed to connect:",
				err.message || err.toString()
			);
			this.isClientConnected = false;
		});
		this.client.on("connect", () => {
			this.isClientConnected = true;
		});
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
