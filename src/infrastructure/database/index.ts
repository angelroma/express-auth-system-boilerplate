import mongoose from "mongoose";
const {DB_URI} = require('../../dotenv/config');

export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (e) {
        console.error(e)
    }
}
const db = mongoose.connection;

db.on('connecting', () => console.log("Attempting to connect to db..."))

db.on('connected', () => console.log("Connected to db :)"))

db.on('close', () => console.log("Database connection closed"))

db.on('error', (e) => console.error("Database error occurred", e))



