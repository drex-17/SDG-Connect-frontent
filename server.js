const app = require('./app');
const express = require('express');
const logger = require('./utils/logger')

require('dotenv').config();


// const app = express();
const PORT = process.env.PORT || 5000;
const host = "localhost";

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  logger.info(`Server started and running on http://${host}:${PORT}`);
});