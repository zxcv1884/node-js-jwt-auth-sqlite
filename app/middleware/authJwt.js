const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        error: "Unauthorized!"
      });
    }
    req.userId = decoded.username;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken
};
module.exports = authJwt;
