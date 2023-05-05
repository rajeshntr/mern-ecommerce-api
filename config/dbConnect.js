import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect('mongodb://localhost:27017/udy-ecommerce');
    console.log(`Mongo DB connected ${(await connected).connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default dbConnect;