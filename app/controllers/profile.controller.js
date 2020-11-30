const db = require("../models");
require('dotenv').config();
const Sequelize = require('sequelize');

const User = db.user;
const Company = db.company;
const Qa = db.qa;
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
  let qa = []
  let company = []
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
    if (roles[i].name === 'company') {
      company = await Company.findOne({ where: { userId: user.id } })
    }
    if (roles[i].name === 'qa') {
      qa = await Qa.findOne({ where: { userId: user.id } })
    }
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
    qa,
    company
  });

};

exports.updateProfile = (req, res) => {
  const userToUpdate = req.body;
  const filter = {
    where: {
      id: parseInt(req.userId)
    },
    include: [
      { model: Qa }
    ]
  };

  User
    //.findByPk(req.userId)
    .findOne(filter)
    .then(async (user) => {
      if (!user) {
        throw new Error(`User not found`);
      }
      let qaData = {};
      let companyData = {};
      if (userToUpdate.company) {
        companyData = Object.assign({}, userToUpdate.company);
        delete user.company;
      }

      if (userToUpdate.qa) {
        //user.Qa.set(userToUpdate.qa, null);
        qaData = Object.assign({}, userToUpdate.qa);
        delete user.qa;
      }
      await user.update(userToUpdate).then(async () => {
        if (qaData) {
          const qa = await user.getQa();
          if (qa) {
            qa.update(qaData);
          } else {
            await user.createQa(qaData)
            res.status(200).send({ message: "Successfully updated" });
          }
        }
        if (companyData) {
          const company = await user.getCompany();
          if (company) {
            company.update(companyData);
          } else {
            await user.createCompany(companyData)
            res.status(200).send({ message: "Successfully updated" });
          }
        }
        res.status(200).send({ message: "Successfully updated" });

      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
    }).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.deleteProfile = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      user.destroy().then(()=>{
        res.status(200).send({ message: "Successfully deleted" });
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
