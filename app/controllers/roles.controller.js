const db = require("../models");
require('dotenv').config();

const Role = db.role;


exports.roles = async (req, res) => {
  // Save User to Database
  const roles = await Role.findAll()
  if (roles) {
    res.status(200).send(roles)
  } else {
    res.status(500).send({ "message": "No roles found" })
  }
};
