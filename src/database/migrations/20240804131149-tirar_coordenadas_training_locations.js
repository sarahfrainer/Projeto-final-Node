'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('training_locations', 'coordinates');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('training_locations', 'coordinates', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
