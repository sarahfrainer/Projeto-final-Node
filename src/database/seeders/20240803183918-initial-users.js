'use strict';

const { hashSync } = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('users', [
    {
    name: 'Marcos Belucci',
    gender: 'Masculino',
    cpf: '12345678910',
    adress: 'Rua Pablo, n 111',
    birthdate: '2000-02-03',
    email: 'marcos@gmail.com',
    password: hashSync('senhaMarcos', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  },
  {
    name: 'Sarah Frainer',
    gender: 'Feminino',
    cpf: '82271028190',
    adress: 'Rua Brusque, n 100',
    birthdate: '1990-08-21',
    email: 'sarah@gmail.com',
    password: hashSync('senhaSarah', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  },
  {
    name: 'Luana Glatz',
    gender: 'Feminino',
    cpf: '80000000000',
    adress: 'Rua Gaspar, n 100',
    birthdate: '1980-08-18',
    email: 'luana@gmail.com',
    password: hashSync('senhaLuana', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
  }
], 
{}
);
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
