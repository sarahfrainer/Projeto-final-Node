const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database.config')

// Cria novo projeto sequelize com a configuração do sistema
const connection = new Sequelize(databaseConfig)

module.exports = connection;