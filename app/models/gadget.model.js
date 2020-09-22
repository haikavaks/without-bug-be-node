module.exports = (sequelize, Sequelize) => {
  return sequelize.define("gadgets", {
    brand: {
      type: Sequelize.TEXT
    },
    model: {
      type: Sequelize.TEXT
    },
    osVersion: {
      type: Sequelize.TEXT
    },
    type: {
      type: Sequelize.TEXT
    },
    pending: {
      type: Sequelize.TEXT
    }
  });
};



