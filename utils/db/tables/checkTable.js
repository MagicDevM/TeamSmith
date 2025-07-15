//Import required modules
const db = require('../credentials');

function checkTable(tableName) {
  const query = `
  SELECT TABLE_NAME
  FROM information_schema.TABLES
  WHERE TABLE_SCHEMA = ?
  AND TABLE_NAME = ?`;

  db.query(query,
    [db.config.database,
      tableName],
    (err) => {
      if (err) {
        log.error('Error checking if table exists:', err);
        return callback(err, false);
      }
    });
}

module.exports = checkTable;