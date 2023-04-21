import mongoose, { Connection } from "mongoose";

type ConnectionProps = {
  isConnected: number | boolean;
}

const connection: ConnectionProps = { isConnected: false };

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected");
  return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("new connection");
    connection.isConnected = mongoose.connection.readyState;
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}

async function disconnect(): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    try {
      await mongoose.disconnect();
      connection.isConnected = false;
    } catch (error) {
      console.log("Error disconnecting from database: ", error);
    }
  } else {
    console.log("db not connected");
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString()
  doc.createdAt = doc.createdAt.toString()
  doc.updatedAt = doc.updatedAt.toString()
  return doc
}

const db = { connect, disconnect, convertDocToObj };
export default db;