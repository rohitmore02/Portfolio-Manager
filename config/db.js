const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(mongoose.connect(process.env.MONGO_URI));
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;