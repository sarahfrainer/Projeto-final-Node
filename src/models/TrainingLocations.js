const { DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Usuario = require('./User');

const TrainingLocations = connection.define('training_locations', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    locality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    paranoid: true // Habilita soft delete
});

// Estabelece relação entre as tabelas

TrainingLocations.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

module.exports = TrainingLocations;
