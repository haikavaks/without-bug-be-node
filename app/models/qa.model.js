module.exports = (sequelize, Sequelize) => {
  return sequelize.define("qas", {
    userId:{
      type: Sequelize.INTEGER,

    },
    languages: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    gadgets: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    rating: {
      type: Sequelize.FLOAT
    },
    experience: {
      type: Sequelize.TEXT
    },
    linkedinUrl: {
      type: Sequelize.STRING
    },

  });
};



