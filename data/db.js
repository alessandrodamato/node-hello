// utilizzando mysql2 
/* const mysql = require('mysql2');

const pool = mysql.createPool({
  host : 'localhost',
  database : 'db_first',
  user : 'root',
  password : 'root',
});

module.exports = pool.promise(); */

// utilizzando sequelize (come eloquent per laravel)
// va importato nell'app.js, e va creata la cartella models che verrà letta in automatico
const Sequelize = require('sequelize');

const sequelize = new Sequelize('db_first', 'root', 'root', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;

