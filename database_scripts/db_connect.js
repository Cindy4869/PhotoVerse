
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://ruoanw2:photoverse@cluster0.louf2.mongodb.net/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("photoverse");
  }
  return db;
}

module.exports = { connectDB };