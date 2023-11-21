const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  blogtitle: {
    type: DataTypes.STRING,
  },
  blogauthor: {
    type: DataTypes.STRING,
  },
  blogcontent: {
    type: DataTypes.STRING,
  },
  blogcomment: {
    type: DataTypes.JSON, 
    allowNull: true,      
  },
}, {
  timestamps: false, 
});

module.exports = Blog;