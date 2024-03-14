import mongoose from "mongoose";


export const connectToDB  = async () => {
  try {
      await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};
