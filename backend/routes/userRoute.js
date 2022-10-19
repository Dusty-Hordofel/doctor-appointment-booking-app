const express = require("express");
const router = express.Router();

//test
router.get(
  "/user",

  (req, res) => {
    res.send("Hello, world!");
  }
);

module.exports = router;
