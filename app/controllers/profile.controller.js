const db = require("../models");
require('dotenv').config();


const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getProfile = async (req, res) => {
  // Get Profile
  const user = await User.findByPk(req.userId)
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  let authorities = [];
  const roles = await user.getRoles()
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    country: user.country,
    email: user.email,
    bank: user.bank,
    phone: user.phone,
    roles: authorities,
  });

};

exports.updateProfile = (req, res) => {
  // User.findOne({
  //   where: {
  //     email: req.body.email
  //   }
  // })
  //   .then(user => {
  //     if (!user) {
  //       return res.status(404).send({ message: "User Not found." });
  //     }
  //
  //     const passwordIsValid = bcrypt.compareSync(
  //       req.body.password,
  //       user.password
  //     );
  //
  //     if (!passwordIsValid) {
  //       return res.status(401).send({
  //         accessToken: null,
  //         message: "Invalid Password!"
  //       });
  //     }
  //
  //     const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
  //       expiresIn: 86400 // 24 hours
  //       //TODO refresh token
  //     });
  //     let authorities = [];
  //     user.getRoles().then(roles => {
  //       for (let i = 0; i < roles.length; i++) {
  //         authorities.push("ROLE_" + roles[i].name.toUpperCase());
  //       }
  //       res.status(200).send({
  //         id: user.id,
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         country: user.country,
  //         email: user.email,
  //         bank: user.bank,
  //         phone: user.phone,
  //         roles: authorities,
  //         accessToken: token
  //       });
  //     });
  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};
exports.deleteProfile = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 86400 // 24 hours
        //TODO refresh token
      });
      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          country: user.country,
          email: user.email,
          bank: user.bank,
          phone: user.phone,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
