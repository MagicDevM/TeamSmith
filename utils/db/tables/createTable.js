//Import required modules
const checkTable = require('./checkTable');
const {db} = require('../credentials');

//Function starts here
function createTable(log) {
  //Checks if table is already created
  if (!checkTable('users', log)) {
    return;
  }
  //Database matter
  const createTableQuery = `CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
  //Tells database to create a table
  db.query(createTableQuery, (err, results) => {
    //Catches any errors in the process
    if (err) {
      log.error(`\x1b[1m\x1b[31mError\x1b[0m\x1b[90m | \x1b[0mError creating table`, err);
    }
  })
}

module.exports = createTable;