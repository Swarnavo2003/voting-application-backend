const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { jwtAuthMiddleware, generateToken } = require("../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    // Create a new Person document using the Mongoose model
    const newPerson = new User(data);

    // Save the new Person to database
    const response = await newPerson.save();

    const payload = {
      id: response.id,
      username: response.username,
    };
    // console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    // console.log("Token is : ", token);

    console.log("Data saved in persons collection");
    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { aadharCardNumber, password } = req.body;

    // Find the user by aadharCardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid username or password" });
    }

    // generate Token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);

    // return token as response
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/profile/password", async (req, res) => {
  try {
    const userId = req.user; // Extract id from token
    const { currentPassword, newPassword } = req.body; // Extract current password and new password from the request body

    // Find the user by userId
    const user = await User.findById(userId);

    // If password doesn't match, return error
    if (1(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Update the user's password
    user.password = newPassword;
    await User.save();

    console.log("password updated");
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
