const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    //TODO: find user email
    const userExists = await User.findOne({ email }); // or email: req.body.email if we don't destructure
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    //TODO: encrypt user password
    // const password = req.body.password;
    const salt = await bcrypt.genSalt(10); //brcypt.genSalt() is used to salt password
    const hashedPassword = await bcrypt.hash(password, salt); //brcypt.hash() is used to hash password
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(
      "🚀 ~ file: userRoutes.js ~ line 28 ~ router.post ~ error",
      error
    );

    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    //TODO: find user using email
    const user = await User.findOne({ email: req.body.email });
    //if user is not found, send message to client
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    //TODO: compare client password and backend password
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    //TODO: if password not match, send message to client
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }); //jwt.sign is used to generate a new token for the user,it's take 3 arguments

      //TODO: Send the message to the client
      res
        .status(200)
        .send({ message: "Login successful", success: true, data: token });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: userRoutes.js ~ line 63 ~ router.post ~ error",
      error
    );

    res
      .status(500)
      .send({ message: "Error logging in", success: false, error });
  }
});

module.exports = router;
