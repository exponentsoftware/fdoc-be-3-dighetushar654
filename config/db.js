const mongoose = require("mongoose");
const config = require("config");
const db = config.get('MONGO_URL');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected....");
    } catch (err) {
        //display error and exit the process using exit code
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;