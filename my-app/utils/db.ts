import mongoose, { Connection } from "mongoose";

interface ConnectionProps {
  isConnected: number | boolean;
}

const connection: ConnectionProps = {
  isConnected: false,
};

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

const db = { connect, disconnect };
export default db;