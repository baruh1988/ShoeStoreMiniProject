const Sequelize = require('sequelize');
const connection = require('../database/connection');

const User = connection.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isConfirmed: Sequelize.BOOLEAN,
    isLocked: Sequelize.BOOLEAN,
    address: Sequelize.STRING,
    city: Sequelize.STRING,
    phone: Sequelize.STRING,
    code: Sequelize.INTEGER
});

module.exports = User;