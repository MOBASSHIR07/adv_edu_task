import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

export const connectDB = async () => {
  try {
    await client.connect();
    
    db = client.db(); 
    

    await db.command({ ping: 1 });
    console.log("✅ Pinged! You successfully connected to MongoDB Atlas.");
    
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

/**
 * @returns {import('mongodb').Db}
 */
export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};