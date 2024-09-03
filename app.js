// importo express e body-parser
const express = require('express');
const bodyParser = require('body-parser');

// importo le rotte
const feedRoutes = require('./routes/feed');

// creo l'app e uso ciò che mi serve
const app = express();

// utile per le chiamate in post inviando i dati nel body
app.use(bodyParser.json());

// utile per consentire i vari permessi
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // url
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE'); // metodi
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// rende la cartella public accessibile
app.use(express.static('public'));

// uso le rotte
app.use('/feed', feedRoutes);


// aggancio il localhost alla porta 8080
app.listen('8080');