const log = require('../utils/logger');

function logout(req, res) {
  if (req.logout) {
    req.logout(err => {
      if (err) {
        log.error(err);
        return res.status(500).send('Logout failed');
      }
      
      // Now destroy session
      req.session.destroy(err => {
        if (err) {
          log.error(err);
          return res.status(500).send('Session destruction failed');
        }
        
        res.clearCookie('connect.sid');
        res.send('Logged out');
      });
    });
  } else {
    // fallback for local users or if logout is undefined
    req.session.destroy(err => {
      if (err) {
        log.error(err);
        return res.status(500).send('Session destruction failed');
      }
      
      res.clearCookie('connect.sid');
      res.send('Logged out');
    });
  }
}

module.exports = logout