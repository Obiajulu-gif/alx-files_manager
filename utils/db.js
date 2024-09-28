// Import MongoClient from MongoDB package
const { MongoClient } = require('mongodb');

// Create the DBClient class
class DBClient {
  constructor() {
    // Get environment variables or default values
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Build the MongoDB connection URL
    const url = `mongodb://${host}:${port}`;
    this.dbName = database;

    // Create a MongoDB client
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect().then(() => {
      this.db = this.client.db(this.dbName);
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
  }

  // Method to check if MongoDB connection is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Asynchronous method to get the number of users in the "users" collection
  async nbUsers() {
    const usersCollection = this.db.collection('users');
    return usersCollection.countDocuments();
  }

  // Asynchronous method to get the number of files in the "files" collection
  async nbFiles() {
    const filesCollection = this.db.collection('files');
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;