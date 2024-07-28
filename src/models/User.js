const { DataTypes } = require("sequelize");
const connection = require("../database/connection");
const {hashSync} = require('bcryptjs');
const TrainingLocations = require("./TrainingLocations");

const User = connection.define('users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    paranoid: true
});


Usuario.hasMany(TrainingLocations, {
    foreignKey: 'usuarioId',
    onDelete: 'RESTRICT' // Impede a exclusão
});


User.beforeSave((user) => {
    user.password = hashSync(user, 10)
    return user
})

module.exports = User