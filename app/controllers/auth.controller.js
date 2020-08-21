const db = require("../models");
require('dotenv').config();


const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  const { firstName, lastName, country, email, bank, phone, password } = req.body;
  User.create({
    firstName,
    lastName,
    country,
    email,
    bank,
    phone,
    password: bcrypt.hashSync(password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          setRoleAndPosition(user, req.body, res, roles)
        });
      } else {
        // user role = 3
        setRoleAndPosition(user, req.body, res)
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

function setRoleAndPosition(user, reqBody, res, roles = [3]) {
  user.setRoles(roles).then(() => {
    // qa
    if (reqBody.qa && reqBody.roles.includes('qa')) {
      user.createQa(reqBody.qa).then(() => {
        return res.send({ message: "User was registered successfully!" });
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
    } else if (reqBody.company && reqBody.roles.includes('company')) {
      user.createCompany(reqBody.company).then(() => {
        return res.send({ message: "User was registered successfully!" });
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
    } else {
      return res.send({ message: "User was registered successfully!" });
    }
  });
  return roles;
}

exports.signin = (req, res) => {
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
