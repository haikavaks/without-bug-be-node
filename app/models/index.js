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

db.gadget = require('./gadget.model.js')(sequelize, Sequelize);

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


db.user.hasOne(db.qa, { foreignKey: 'userId', unique: true, onDelete: 'CASCADE' });
db.user.hasOne(db.company, { foreignKey: 'userId', unique: true, onDelete: 'CASCADE' });

db.qa.belongsToMany(db.gadget, { through: 'user_gadgets', foreignKey: 'userId', otherKey: 'gadgetId' });
db.gadget.belongsToMany(db.qa, { through: 'user_gadgets', foreignKey: 'gadgetId', otherKey: 'userId' });

db.ROLES = ['superAdmin', 'admin', 'company', 'qa'];
module.exports = db;

