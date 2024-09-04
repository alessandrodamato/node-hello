const Sequelize = require('sequelize');

const sequelize = require('../data/db');

const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  author: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  publication_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  likes: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
    defaultValue: 0
  },
  comments: {
    type: Sequelize.MEDIUMINT,
    allowNull: false,
    defaultValue: 0
  }
});

module.exports = Post;