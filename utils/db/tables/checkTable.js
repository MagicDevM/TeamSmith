//Import required modules
const {db} = require('../credentials');

//Function starts here
function checkTable(tableName, log) {
  //Database matter
  const query = `
  SELECT TABLE_NAME
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = ?
  AND TABLE_NAME = ?`;
  
  //Tells the database to check if the table exists
  db.query(query,
    [db.config.database,
      tableName],
    //Catches any errors found in the process
    (err) => {
      if (err) {
        log.error('Error checking if table exists:', err);
        return callback(err, false);
      }
    });
}

module.exports = checkTable;