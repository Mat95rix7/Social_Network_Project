// const mongoose = require('mongoose')


// const connect_MongoDB = () =>{
//     mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.log("Failed to connect to MongoDB", err))
// }

// module.exports = connect_MongoDB
// db.js

const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const getUri = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGODB_TEST_URI;
  } else {
    return process.env.MONGODB_URI;
  }
};

const connect_MongoDB = async () => {
  const uri = getUri();

  if (isConnected) {
    console.log('Already connected to database');
    return;
  }

  try {
    mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
    throw error;
  }
};

module.exports = connect_MongoDB

