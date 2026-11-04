import mongoose from "mongoose";

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = {
    connection: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    const options = {
      bufferCommands: false,
      dbName: "quickcart",
    };

    cache.promise = mongoose
      .connect(process.env.MONGODB_URI, options)
      .then((mongoose) => mongoose);
  }

  cache.connection = await cache.promise;

  return cache.connection;
};

export default connectDB;