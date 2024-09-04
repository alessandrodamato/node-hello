// importo express e body-parser
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./data/db');

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

// importo i modelli per le relazioni
const Post = require('./models/post');
const User = require('./models/user');
// relazioni
User.hasMany(Post);
Post.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

sequelize.authenticate()
.then(res => {
  console.log('Connessione al DB eseguita con successo');
  // se l'autenticazione va a buon fine sincronizzo il DB
  sequelize.sync({force: true})
  .then(res => {return User.findByPk(1)})
  .then(user => {
    if (!user){
      return User.create({name: 'Alessandro', email: 'alessandro@gmail.com', password: 'alex'})
    }
    return user;
  })
  .then(user => {
    console.log(user);
    console.log('Sincronizzazione eseguita con successo');
    // aggancio il localhost alla porta 8080 se il DB è connesso e sincronizzato
    app.listen('8080');
  })
  .catch(err => {
    console.log('Sincronizzazione fallita: ' + err);

  })
})
.catch(err => {
  console.log('Connessione al DB fallita: ' + err);
})