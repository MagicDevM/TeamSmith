//Import required modules
const mysql = require('mysql2');

//database credentials
const db = mysql.createConnection({
  //Hostname of the database
  host: 'trolley.proxy.rlwy.net',
  //Username of the database user
  user: 'root',
  //Password of the database user
  password: 'QBjRKErhXGfuTmgVcZzJXFGwiILEpSUx',
  //Name of the database
  database: 'railway',
  //Connection port of the database
  port: '14537',
});

//raw database credentials
const dbraw = {
  //Hostname of the database
  host: 'trolley.proxy.rlwy.net',
  //Username of the database user
  user: 'root',
  //Password of the database user
  password: 'QBjRKErhXGfuTmgVcZzJXFGwiILEpSUx',
  //Name of the database
  database: 'railway',
  //Connection port of the database
  port: '14537',
};

module.exports = {db, dbraw};