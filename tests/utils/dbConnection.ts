import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer;

/**
 * Connects to an in-memory MongoDB instance.
 *
 * This function creates a new in-memory MongoDB server using `mongodb-memory-server`
 * and connects to it using Mongoose.
 */
export const connectDB = async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  const uri = await mongoServer.getUri();
  await mongoose.connect(uri);
};

/**
 * Disconnects from the in-memory MongoDB instance and stops the server.
 */
export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
