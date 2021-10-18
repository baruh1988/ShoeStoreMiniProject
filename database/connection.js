const Sequelize = require('sequelize');

const connection = new Sequelize(
    'shoestoredb',
    'root',
    'Azx1988',
    {
        dialect: 'mysql',
        host: 'localhost'
    }
);

module.exports = connection;