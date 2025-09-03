const express = require('express');
const { index, show, create, update, destroy } = require('../controllers/contactsController');

const router = express.Router();

router.route('/')
  .get(index)
  .post(create);

router.route('/:id')
  .get(show)
  .put(update)
  .delete(destroy);

module.exports = router;
