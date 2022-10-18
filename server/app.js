// const express = require("express");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const cors = require("cors");
// const path = require("path");
// const app = express();
// dotenv.config();

// const dbConfig = require("./config/db");

// //Routes
// const userRoutes = require("./routes/userRoute");
// const adminRoute = require("./routes/adminRoute");
// const doctorRoute = require("./routes/doctorsRoute");

// app.use(morgan("dev"));
// app.use(cors());
// app.use(express.json({ limit: "5mb" }));
// app.use(express.urlencoded({ limit: "5mb", extended: true }));

// const PREFIX = "/" + process.env.PREFIX;

// app.use(PREFIX, userRoutes);
// app.use("/api/admin", adminRoute);
// app.use("/api/doctor", doctorRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }

// const port = process.env.PORT || 3810;
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
