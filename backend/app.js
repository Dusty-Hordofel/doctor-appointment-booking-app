const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const dbConfig = require("./config/db");
//Routes
const userRoutes = require("./routes/userRoute");
// console.log("🚀 ~ file: app.js ~ line 10 ~ userRoutes", userRoutes);
// // app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const PREFIX = "/" + process.env.PREFIX;
console.log("🚀 ~ file: app.js ~ line 17 ~ PREFIX", PREFIX);

app.use(PREFIX, userRoutes);

const port = process.env.PORT || 3838;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
