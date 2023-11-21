const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  comment: {
    type: DataTypes.STRING,
  },
  blogid:{
    type: DataTypes.INTEGER,
  },

}, {
  timestamps: false, 
});

module.exports = Comment;