require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const leadsRouter = require("./routes/leads");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/leads_db";

// Use the cors middleware with specific origin
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Use the leads router for all /api/leads endpoints
app.use("/api/leads", leadsRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  }); 