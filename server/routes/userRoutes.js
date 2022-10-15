const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const authMiddleware = require("../middlewares/authMiddleware");
// const Appointment = require("../models/appointmentModel");
// const moment = require("moment");

router.post("/user/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    //TODO: find user email
    const userExists = await User.findOne({ email });
    // const userExists = await User.findOne({ email: req.body.email });
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
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user", success: false, error });
  }
});

module.exports = router;
