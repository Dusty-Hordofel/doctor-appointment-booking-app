const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const dbConfig = require('./config/db');

// console.log(process.env.MONGO_URL);
const port = process.env.PORT || 3810;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
