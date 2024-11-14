import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 *
 * Retrieves the MongoDB URI from the `MONGO_URI` environment variable
 * and establishes a connection to the database.
 */
export const dbConnect = async () => {
  const uri = process.env.MONGO_URI;

  // Connect to MongoDB
  await mongoose.connect(uri!);
  console.log("✅ Connected to MongoDB");
};

/**
 * Disconnects from the MongoDB database.
 */
export const dbDisconnect = async () => {
  await mongoose.disconnect();
  console.log("✅ Disconnected from MongoDB");
};
