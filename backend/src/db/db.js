import mongoose from "mongoose";
import { DBNAME, MONGO_URI } from "../constents.js";

const connectDB = async () => {
  try {
    const mongodbConnectionInstance = await mongoose.connect(`${MONGO_URI}/${DBNAME}`)
    console.log(`MongoDB connected successfully host: ${mongodbConnectionInstance.connection.host}`);
  } catch (error) {
    console.log("DB Connection failed")
    process.exit(1)
  }
}

export default connectDB
