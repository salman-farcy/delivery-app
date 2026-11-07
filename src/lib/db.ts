import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
     throw new Error("Please define MONGODB_URI");
}

const cached = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

async function connectDB() {
     if (cached.conn) return cached.conn;

     if (!cached.promise) {
          cached.promise = mongoose.connect(MONGODB_URL as string, {
               bufferCommands: false,
          });
     }

     try {
          cached.conn = await cached.promise;
          console.log("MongoDB Connected ✅");
     } catch (error) {
          cached.promise = null;
          console.error(
               "MongoDB Connection Error:",
               error instanceof Error ? error.message : error
          );
          throw error;
     }

     return cached.conn;
}

export default connectDB;