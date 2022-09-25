const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
app.listen(2290, () => {
  console.log('Server started on port 2290');
});
