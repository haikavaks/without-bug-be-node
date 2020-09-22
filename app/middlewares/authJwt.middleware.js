const jwt = require("jsonwebtoken");
const db = require("../models");
require('dotenv').config();
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isSuperAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superAdmin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require  Super Admin Role!"
      });
      return;
    });
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require  Admin Role!"
      });
      return;
    });
  });
};


isQA = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "qa") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require QA Role!"
      });
    });
  });
};

isCompany = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "company") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require QA Role!"
      });
    });
  });
};

isSuperAdminOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "superAdmin") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Super Admin or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isSuperAdmin: isSuperAdmin,
  isAdmin: isAdmin,
  isQA: isQA,
  isCompany: isCompany,
  isSuperAdminOrAdmin: isSuperAdminOrAdmin,
};
module.exports = authJwt;
