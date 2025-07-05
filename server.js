//Gets required modules
const express = require('express');

//Initializes the express module
const app = express();

//Initializes the logger module
const log = new(require('cat-loggr'))();

//Starting process starts here
log.info('Starting Website');

//Starts the server
const PORT = "7777";
app.listen(PORT, () => {
  log.info(`Website online on Port:${PORT}`);
})