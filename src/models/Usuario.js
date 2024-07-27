const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const {hashSync} = require('bcryptjs');
const TrainingLocations = require("./TrainingLocations");

const Usuario = connection.define('users', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.ENUM('Masculino', 'Feminino', 'Outro'),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    adress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password' 
    }
})

// hooks
Usuario.hasMany(TrainingLocations, {
    foreignKey: 'usuarioId',
    onDelete: 'RESTRICT' // Impede a exclusão
});


Usuario.beforeSave((usuario) => {
    usuario.password_hash = hashSync(usuario.password_hash, 10)
    return usuario
})

module.exports = Usuario