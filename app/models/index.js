require('dotenv').config();
const Sequelize = require('sequelize');
const { DATABASE_URI } = process.env;

const sequelize = new Sequelize(DATABASE_URI);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model.js')(sequelize, Sequelize);
db.role = require('./role.model.js')(sequelize, Sequelize);
db.qa = require('./qa.model.js')(sequelize, Sequelize);
db.company = require('./company.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId'
});

db.user.belongsToMany(db.role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId'
});


db.user.hasOne(db.qa, {foreignKey: 'userId',  unique: true});
db.user.hasOne(db.company, {foreignKey: 'userId',  unique: true});


db.ROLES = ['superAdmin', 'admin', 'company', 'qa'];

module.exports = db;

