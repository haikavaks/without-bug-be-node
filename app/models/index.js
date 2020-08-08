require('dotenv').config();
const Sequelize = require("sequelize");
const { HOST, USER, PASS, DB } = process.env;
const sequelize = new Sequelize(`postgres://${USER}:${PASS}@${HOST}:5432/${DB}`)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["superAdmin", "admin", "company", "qa"];

module.exports = db;

