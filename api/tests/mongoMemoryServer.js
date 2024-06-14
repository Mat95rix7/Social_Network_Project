const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

// const connect_MongoDB = () => {
//   mongoServer = MongoMemoryServer.create();
//   mongoose.connect("mongodb+srv://" + process.env.connectMongoDB + "@cluster0.fzwwhuc.mongodb.net/JestTest")
//   .then(() => console.log("Connected to MongoDB test"))
//   .catch((err) => console.log("Failed to connect to MongoDB", err))
// };

const closeDatabase = async () => {
  await mongoose.connection.close();
};

const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

module.exports = {
    // connect_MongoDB,
    closeDatabase,
    clearDatabase
};
