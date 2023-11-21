const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blogs', 'root', 'Aman8624$', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;