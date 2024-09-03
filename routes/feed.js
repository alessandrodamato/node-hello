// importo express e Router
const express = require('express');
const { check, query } = require('express-validator');
const router = express.Router();

// importo i controllers
const feedController = require('../controllers/feed');

//rotte
router.get('/posts', feedController.getPosts);

// validazione con express-validator -> https://github.com/validatorjs/validator.js
router.post('/post',
  [
    check('author').trim()
    .isLength({ min: 3, max: 50 }).withMessage('L\'autore deve essere compreso tra 3 e 50 caratteri')
    .exists().withMessage('L\'autore è obbligatorio'),

    check('title').trim()
    .isLength({ min: 3, max: 50 }).withMessage('Il titolo deve essere compreso tra 3 e 50 caratteri')
    .exists().withMessage('Il titolo è obbligatorio'),

    // esempio come la conferma delle password
    // check('authorConfirm').trim()
    // .custom((value, { req }) => value === req.body.author).withMessage('La conferma dell\'autore non corrisponde'),

    query('max').custom((value, {req}) => value > 100).withMessage('Il parametro max deve essere maggiore di 100')
  ]
,feedController.createPost);

module.exports = router;