module.exports = (sequelize, Sequelize) => {
  return sequelize.define("companies", {
    userId:{
      type: Sequelize.INTEGER,

    },
    listOfRewards: {
      type: Sequelize.INTEGER,
    },
    projects: {
      type: Sequelize.TEXT
    },
    // join to projects
  });
};



