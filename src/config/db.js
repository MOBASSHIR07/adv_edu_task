import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

// Create a MongoClient with the Stable API version
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
    // Connect the client to the server
    await client.connect();
    
    // Choose the database name (it will use the one in your URI or 'ecommerce' by default)
    db = client.db(); 
    
    // Ping to confirm connection
    await db.command({ ping: 1 });
    console.log("✅ Pinged! You successfully connected to MongoDB Atlas.");
    
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// This function allows services to get the DB instance easily
export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};