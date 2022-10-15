const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
dotenv.config();
const app = express();

const dbConfig = require("./config/db");

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const PREFIX = "/" + process.env.PREFIX;

app.use(PREFIX, userRoutes);

// console.log(process.env.MONGO_URL);
const port = process.env.PORT || 3810;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
