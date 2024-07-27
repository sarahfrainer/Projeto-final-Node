'use strict';

/* Cada usuário pode cadastrar um ou mais locais de Treino, fornecendo informações detalhadas sobre cada local.
Informações como nome do local, descrição, localidade, coordenadas geográficas, e outras devem ser capturadas.
O usuário deve ser capaz de resgatar o link do Google Maps apontando para o local cadastrado.
Regras específicas devem ser implementadas, como não permitir a deleção de um usuário que tenha locais associados.
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('training_locations', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      locality: {
        allowNull: false,
        type: Sequelize.STRING
      },
      coordinates: {
        type: Sequelize.ARRAY(Sequelize.FLOAT), // Array de floats para latitude e longitude
        allowNull: false
      },
      cep: {
        allowNull: false,
        type: Sequelize.STRING
      },
      usuarioId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Nome da tabela de usuários
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('training_locations');
  }
};
