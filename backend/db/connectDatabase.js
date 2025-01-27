const mongoose = require("mongoose")
const mongoUri = process.env.MONGO_URI;

const connectToDatabase = async()=>{
    try {
        await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database Connected")
    } catch (error) {
        console.log("Error")
        
    }
}

module.exports = connectToDatabase;