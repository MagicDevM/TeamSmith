//Import required modules
const {db} = require('./credentials');

//Function starts here
function connect(log) {
  //Connects to the database
  db.connect((err) => {
    //Logs errors
    if (err) {
      log.error(`Unable to connect to mysql`, err);
      return;
    };
    //Logs success message
    log.info('Successfully connected to database.');
  });
}

module.exports = connect;