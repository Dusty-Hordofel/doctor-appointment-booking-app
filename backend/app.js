const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const dbConfig = require("./config/db");
//Routes
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
// console.log("🚀 ~ file: app.js ~ line 10 ~ userRoutes", userRoutes);
// // app.use(morgan("dev"));

console.log(process.env.CORS_ORIGIN);

const corsOptions = { origin: process.env.CORS_ORIGIN };
app.use(cors(corsOptions));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const PREFIX = "/" + process.env.PREFIX;
console.log("🚀 ~ file: app.js ~ line 17 ~ PREFIX", PREFIX);

app.use(PREFIX, userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

app.use("/", (req, res) => {
  res.send("Everything is good!");
});

const port = process.env.PORT || 3838;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
