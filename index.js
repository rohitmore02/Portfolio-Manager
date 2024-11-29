const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect('mongodb+srv://rohitmore386:rohit123@userdb.cbwue.mongodb.net/?retryWrites=true&w=majority&appName=userDB')
.then(() => console.log("MongoDB connected..."))
.catch((err) => console.log("Database connection failed:", err))

// Initialize express app
const app = express();

// Middleware for parsing JSON
app.use(express.json());
// Middleware for Encoded Url's in payload
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));  // Authentication routes
app.use("/api/user", require("./routes/user"));  // User routes
app.use("/api/admin", require("./routes/admin")); // Admin routes


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Server Error" });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));