
// const { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://ruoanw2:photoverse@cluster0.louf2.mongodb.net/";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let db;

// async function connectDB() {
//   if (!db) {
//     await client.connect();
//     db = client.db("photoverse");
//   }
//   return db;
// }

// module.exports = { connectDB };


const mongoose = require('mongoose');
const uri = "mongodb+srv://ruoanw2:photoverse@cluster0.louf2.mongodb.net/photoverse?retryWrites=true&w=majority";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    // await mongoose.connect(uri, {});
    try {
      await mongoose.connect(uri, {});
      console.log("Successfully connected to MongoDB.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
}

module.exports = { connectDB };
