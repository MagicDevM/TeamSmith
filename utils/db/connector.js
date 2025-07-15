//Import required modules
const db = require('./credentials');

//Function starts here
function connect(log) {
  db.connect((err) => {
    if (err) {
      log.error(`Unable to connect to mysql`, err);
      return;
    };
    log.info('Successfully connected to database.');
  });
}

module.exports = connect;