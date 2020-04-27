const config = require("../config/auth.config");
const Database = require('better-sqlite3');
const db = new Database('Account.db', { verbose: console.log });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const stmt = db.prepare('SELECT user, password FROM Users Where user = ?');

exports.changePassword = (req, res) => {
  let user = stmt.get(req.body.username)
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }
  let update = db.prepare('UPDATE Users SET password = ? WHERE user = ?')
  update.run(bcrypt.hashSync(req.body.newPassword, 8), req.body.username);
  res.status(200).send({
    username: user.user,
    message: "Update Success",
  });
}

exports.auth = (req, res) => {
  if (!req.body.token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    res.status(200).send({
      username: decoded.username,
      message: "Auth Success",
    });
    console.log(decoded)
    console.log(decoded.username, 'Auth Success')
  });

}

exports.signup = (req, res) => {
  let user = stmt.get(req.body.username)
  if (!user) {
    const insert = db.prepare('INSERT INTO Users (user, password) VALUES (?, ?)');
    insert.run(req.body.username, bcrypt.hashSync(req.body.password, 8));
    res.status(200).send({
      message: 'Sign up Success'
    });
  } else {
    return res.status(401).send({
      message: "This account already exists!"
    });
  }
};

exports.signin = (req, res) => {
  let user = stmt.get(req.body.username)
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  let passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!"
    });
  }

  let token = jwt.sign({ username: user.user }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
  res.status(200).send({
    token: token
  });
};
