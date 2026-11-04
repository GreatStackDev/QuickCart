const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ernestfiah31_db_user:YOUR_PASSWORD@cluster0.gyrbj3s.mongodb.net/?appName=Cluster0";

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);

    await mongoose.connection.db.admin().command({
      ping: 1,
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("MongoDB connection failed:");
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();