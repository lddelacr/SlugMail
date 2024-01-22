const db = require('./db');

exports.getAll = async (req, res) => {
  const mails = await db.selectMails(req.query.mailbox, req.user.email);
  // console.log(req.user);
  // console.log(req.query.from);
  if (mails) {
    res.status(200).json(mails);
  } else {
    res.status(404).send();
  }
};
