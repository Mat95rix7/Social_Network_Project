const mongoose = require('mongoose')


const connect_MongoDB = () =>{
    mongoose.connect("mongodb+srv://" + process.env.connectMongoDB + "@cluster0.fzwwhuc.mongodb.net/TheNewProject")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err))
}

module.exports = connect_MongoDB