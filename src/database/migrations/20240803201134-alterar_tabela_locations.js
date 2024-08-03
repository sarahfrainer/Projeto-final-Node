'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('training_locations', 'usuarioId', 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('training_locations', 'user_id', 'usuarioId');
  }
};
