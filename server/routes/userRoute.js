const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");
const createError = require("http-errors");

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

router.post("/user/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    //TODO: find user by id
    const user = await User.findOne({ _id: req.body.userId }); //req.body.userId from authMiddleware
    user.password = undefined;
    //TODO: if user doesn't exist yet
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      //TODO: send response to the client
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: userRoutes.js ~ line 97 ~ router.post ~ error",
      error
    );
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

router.post("/user/apply-doctor-account", authMiddleware, async (req, res) => {
  try {
    //TODO: create a new doctor
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    //TODO:  save a new Doctor
    await newdoctor.save();

    //TODO:find the admin user , we have only one admin user
    const adminUser = await User.findOne({ isAdmin: true });
    //TODO:if admin doesn't exist
    if (!adminUser) {
      return res
        .status(200)
        .send({ message: "Admin user doesn't exist", success: false });
    }

    //TODO: unseenNotifications for admin user
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist", //onClickPath is used to
    });

    //TODO: Push a new notification to  admin user updating unseenNotifications
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

    //TODO: send notification to client
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: userRoutes.js ~ line 142 ~ router.post ~ error",
      error
    );

    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

//MARK ALL NOTIFICATIONS AS SEEN
router.post(
  "/user/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      //TODO: find user by id
      const user = await User.findOne({ _id: req.body.userId });

      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      //TODO: Add unseenNotifications to seenNotifications
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      //TODO: Save Changes
      const updatedUser = await user.save();
      //TODO: set password to undefined before sending message to client
      updatedUser.password = undefined;
      //TODO: Send message to client
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      //TODO:Handle error messages
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

//DELETE ALL NOTIFICATIONS
router.post(
  "/user/delete-all-notifications",
  authMiddleware,
  async (req, res) => {
    try {
      //TODO: find user by id
      const user = await User.findOne({ _id: req.body.userId });
      //TODO: Empty seenNotifications and unseenNotifications
      user.seenNotifications = [];
      user.unseenNotifications = [];
      //TODO: save changes
      const updatedUser = await user.save();
      //TODO: set password to undefined before sending message to client
      updatedUser.password = undefined;
      //TODO: send message to client
      res.status(200).send({
        success: true,
        message: "All notifications cleared",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      //TODO:Handle error messages
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

//GET ALL APPROVED DOCTORS LIST
router.get(
  "/user/get-all-approved-doctors",
  authMiddleware,
  async (req, res) => {
    try {
      const doctors = await Doctor.find({ status: "approved" });
      res.status(200).send({
        message: "Doctors fetched successfully",
        success: true,
        data: doctors,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }
);

module.exports = router;
