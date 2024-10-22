import mongoose from "mongoose";

const MONGO_URI: string = process.env.MONGO_URI!;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "ezMeal" });
    console.log("DB is connected");
  } catch (error: any) {
    console.log(error.message);
  }
};
