const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });

    // Check if user already exists
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user
    user = new User({
      username,
      password,
      role,
    });

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Log in a user and return a JWT token
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
