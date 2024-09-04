const { validationResult } = require('express-validator');
const sequelize = require('../data/db');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {

  // con sequelize
  Post.findAll({
    // findAll prende tutto, e possiamo modificare la query a nostro piacimento
    // where: {
    //   id: 7
    // }
  })
  .then(posts => {
    res.status(201).json({
      posts: posts
    });
  })
  .catch(err => {
    res.status(400).json({
      message: 'Failed',
      errors: err
    }); 
  });

  // senza sequelize
  // db.execute('SELECT * FROM posts')
  //   // ritorna due oggetti, i dati e i campi, in questo caso prendiamo solo i dati
  //   .then(([rows, fields]) => {
  //     res.status(201).json({
  //       posts: rows
  //     });
  //   })
  //   .catch(err => {
  //     res.status(400).json({
  //       message: 'Failed',
  //       errors: err
  //     }); 
  //   });
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

  // usando il modello post con sequelize
  Post.create({
    author: author,
    title: title,
    content: content,
    publication_date: publicationDate,
    likes: likes,
    comments: comments
  })
  .then(post => {
    res.status(201).json({
      message: 'Post creato con successo',
      post: post
    })
  })
  .catch(err => {
    console.log('Creazione del post fallita: ' + err);
  });
  
  // senza sequelize
  // let newPost = db.execute('INSERT INTO posts (author, title, content, publication_date, likes, comments) VALUES (?,?,?,?,?,?)', 
  // [author, title, content, publicationDate, likes, comments]);

  // newPost.then(post => {
  //   const ID = post[0].insertId;
  //   res.status(201).json({
  //     post:{
  //       id: ID,
  //       author: author,
  //       title: title,
  //       content: content,
  //       publication_date: publicationDate,
  //       likes: likes,
  //       comments: comments
  //     }
  //   })
  // })
  // .catch(err => {
  //   return res.status(422).json({
  //     message: 'Errore nel salvataggio',
  //     errors: err
  //   })
  // });

};

exports.editPost = (req, res, next) => {

  // prendo l'id passato come parametro
  const postId = req.params.id;

  // prendo i parametri da modificare
  const author = req.body.author;
  const title = req.body.title;
  const content = req.body.content;

  Post.findByPk(postId)
  .then(post => {
    // assegno i nuovi valori
    post.author = author;
    post.title = title;
    post.content = content;

    //salvo per poi restituire
    return post.save();
  })
  .then(post => {
    res.status(200).json({
      post: post
    })
  })
  .catch(err => {
    console.log(err);
  });
};

exports.deletePost = (req, res, next) => {

  const postId = req.params.id;

  Post.findByPk(postId)
  .then(post => {
    return post.destroy();
  })
  .then(post => {
    res.status(200).json({
      message: 'Post eliminato con successso'
    })
  })
  .catch(err => {
    res.status(400).json({
      message: 'Errore nell\'eliminazione del post'
    })
  });
};