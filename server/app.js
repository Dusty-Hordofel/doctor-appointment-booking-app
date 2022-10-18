const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
dotenv.config();
const app = express();

const dbConfig = require("./config/db");

//Routes
const userRoutes = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const PREFIX = "/" + process.env.PREFIX;

app.use(PREFIX, userRoutes);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

// console.log(process.env.MONGO_URL);
const port = process.env.PORT || 3810;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  // res.status = err.status || 500;
  console.log(err.status);

  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message || "Internal Server Error",
    },
  });
});
