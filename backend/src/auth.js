const db = require('./db');
const secrets = require('./secrets');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const toLogin = await db.login(req.body.email, req.body.pass);
  if (toLogin) {
    res.status(200).json(toLogin);
  } else {
    res.status(401).send();
  }
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, secrets.accessToken, (err, user) => {
    if (err) {
      // console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
