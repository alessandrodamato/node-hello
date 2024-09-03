const { validationResult } = require('express-validator');
const db = require('../data/db');

exports.getPosts = (req, res, next) => {
  db.execute('SELECT * FROM posts')
    // ritorna due oggetti, i dati e i campi, in questo caso prendiamo solo i dati
    .then(([rows, fields]) => {
      res.status(201).json({
        posts: rows
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failed',
        errors: err
      }); 
    });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Errore nella validazione',
      errors: errors.array()
    })
  }

  const date = new Date();

  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content || null;
  const publicationDate = date.toISOString().split('T')[0];
  const likes = Math.floor(Math.random() * 501);
  const comments = Math.floor(Math.random() * 501);
  
  let newPost = db.execute('INSERT INTO posts (author, title, content, publication_date, likes, comments) VALUES (?,?,?,?,?,?)', 
  [author, title, content, publicationDate, likes, comments]);

  newPost.then(post => {
    const ID = post[0].insertId;
    res.status(200).json({
      post:{
        id: ID,
        author: author,
        title: title,
        content: content,
        publication_date: publicationDate,
        likes: likes,
        comments: comments
      }
    })
  })
  .catch(err => {
    return res.status(422).json({
      message: 'Errore nel salvataggio',
      errors: err
    })
  });

};