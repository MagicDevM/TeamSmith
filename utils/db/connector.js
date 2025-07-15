function connect(mysql, log) {
  const db = mysql.createConnection({
    host: 'trolley.proxy.rlwy.net',
    user: 'root',
    password: 'QBjRKErhXGfuTmgVcZzJXFGwiILEpSUx',
    database: 'railway',
    port: '14537',
  });
  db.connect((err) => {
    if (err) {
      log.error(`Unable to connect to mysql`, err);
      return;
    };
    log.info('Successfully connected to database.');
  });
}

module.exports = connect;