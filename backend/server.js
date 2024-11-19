const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// MongoDB connection
mongoose.connect(
  "mongodb://chaitanya81082430:Csgl2318159@userregistrationcluster-shard-00-00.hskcw.mongodb.net:27017,userregistrationcluster-shard-00-01.hskcw.mongodb.net:27017,userregistrationcluster-shard-00-02.hskcw.mongodb.net:27017/UserRegistrationDB?ssl=true&replicaSet=atlas-gicgt8-shard-0&authSource=admin&retryWrites=true&w=majority&appName=UserRegistrationCluster",
  {
    serverSelectionTimeoutMS: 30000, // Set timeout to 30 seconds
  }
)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error connecting to MongoDB:", err.message);
  process.exit(1); // Exit the app if MongoDB connection fails
});



// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL if different
  })
);

app.use(bodyParser.json());

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dob: Date,
});

const User = mongoose.model("User", userSchema);

// CRUD routes
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/users", async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  console.log("User saved:", newUser); // Log the saved user data
  res.json(newUser);
});

app.put("/api/users/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedUser);
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send("User deleted");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
