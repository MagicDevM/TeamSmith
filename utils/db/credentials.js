//Import required modules
const mysql = require('mysql2');

//Main credentials
const db = mysql.createConnection({
  host: 'trolley.proxy.rlwy.net',
  user: 'root',
  password: 'QBjRKErhXGfuTmgVcZzJXFGwiILEpSUx',
  database: 'railway',
  port: '14537',
});

module.exports = db;