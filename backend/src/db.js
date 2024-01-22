const {Pool} = require('pg');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secrets = require('./secrets');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.login = async (email, pass) => {
  const select = 'SELECT * from person WHERE email = $1';
  const query = {
    text: select,
    values: [email],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  if (rows.length == 1 && bcrypt.compareSync(pass, rows[0].pass)) {
    const accessToken = jwt.sign(
      {email: rows[0].email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    return {name: rows[0].fullname, accessToken: accessToken};
  } else {
    return false;
  }
};

exports.selectMails = async (mailbox, user) => {
  let select = 'SELECT * FROM mail';
  const query = {};
  select += ` WHERE mailbox = $1`;
  query['text'] = select;
  query['values'] = [user+mailbox];

  const {rows} = await pool.query(query);

  if (rows.length == 0) {
    return undefined;
  } else {
    const allMail = {};
    for (const row of rows) {
      if (!allMail.hasOwnProperty(row.mailbox)) {
        allMail[row.mailbox] = [];
      }
      row.mail['id'] = row.id;
      allMail[row.mailbox].push(row.mail);
    }

    const keys = Object.keys(allMail);
    const box = [];
    keys.forEach((key) => {
      box.push({'name': key, 'mail': allMail[key]});
    });
    return box;
  }
};
