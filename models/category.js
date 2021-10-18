const Sequelize = require('sequelize');
const connection = require('../database/connection');

const Category = connection.define('category',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoryName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryOrder: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    categoryImage: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryDescription: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accountName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Category;