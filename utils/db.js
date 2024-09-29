import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || "localhost";
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || "files_manager";
		const uri = `mongodb://${host}:${port}`;

		this.client = new MongoClient(uri, { useUnifiedTopology: true });
		this.client
			.connect()
			.then(() => {
				this.db = this.client.db(database);
			})
			.catch((err) => {
				console.error("MongoDB connection error:", err);
			});
	}

	isAlive() {
		return this.client.connected;
	}

	async nbUsers() {
		try {
			const usersCollection = this.db.collection("users");
			return await usersCollection.countDocuments();
		} catch (err) {
			console.error("MongoDB nbUsers error:", err);
			return 0;
		}
	}

	async nbFiles() {
		try {
			const filesCollection = this.db.collection("files");
			return await filesCollection.countDocuments();
		} catch (err) {
			console.error("MongoDB nbFiles error:", err);
			return 0;
		}
	}
}

const dbClient = new DBClient();
export default dbClient;
