const { DataTypes } = require('sequelize');
const connection = require('../database/connection');
const Usuario = require('./Usuario');

const TrainingLocations = connection.define('training_locations', {
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
    coordinates: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usuarioId: {
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


TrainingLocations.belongsTo(Usuario, {
    foreignKey: 'usuarioId'
});

module.exports = TrainingLocations;
