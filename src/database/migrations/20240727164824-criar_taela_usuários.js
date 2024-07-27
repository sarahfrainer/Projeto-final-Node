'use strict';

/* O sistema deve iniciar carregando do banco de dados uma lista de usuários já cadastrados.
No endpoint de login, deve haver opções para login e cadastro de novos usuários.
Os usuários devem fornecer informações como nome, sexo, CPF, endereço, e-mail, senha, data de nascimento.
Regras de validação devem ser implementadas, como evitar o cadastro de pessoas com o mesmo CPF e ou mesmo email.
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('Masculino', 'Feminino', 'Outro')
      },
      cpf: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      adress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthdate: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};