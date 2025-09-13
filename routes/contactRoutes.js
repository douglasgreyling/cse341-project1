const express = require('express');
const { index, show, create, update, destroy } = require('../controllers/contactsController');

const router = express.Router();

router.get(
  '/',
  index
  /*
    #swagger.tags = ['Contacts']
    #swagger.path = '/contacts'
    #swagger.summary = 'Get all contacts'
    #swagger.responses[200] = {
      description: 'List of contacts',
      schema: [{ _id: "68b83735bb09a553dda95317", email: "greyling.douglas@gmail.com", birthday: "1996-08-22", favoriteColor: "Green", firstName: "Doug", lastName: "Greyling", fullName: "Doug Greyling", age: 29, id: "68b83735bb09a553dda95317" }]
    }
*/);

router.post(
  '/',
  create
  /*
    #swagger.tags = ['Contacts']
    #swagger.path = '/contacts'
    #swagger.summary = 'Create a new contact'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Create a new contact',
      schema: {
        $email: "john.doe@example.com",
        $birthday: "1990-12-31",
        $favoriteColor: "Blue",
        $firstName: "John",
        $lastName: "Doe",
        $fullName: "John Doe",
        $age: 34,
      }
    }
    #swagger.responses[201] = {
      description: 'Contact created successfully',
      schema: { _id: "68b83735bb09a553dda95317", email: "john.doe@example.com", birthday: "1990-12-31", favoriteColor: "Blue", firstName: "John", lastName: "Doe", fullName: "John Doe", age: 34, id: "68b83735bb09a553dda95317" }
    }
    #swagger.responses[400] = {
      description: 'Bad request - missing required fields'
    }
*/);

router.get(
  '/:id',
  show
  /*
    #swagger.tags = ['Contacts']
    #swagger.path = '/contacts/{id}'
    #swagger.summary = 'Get a contact by ID'
    #swagger.parameters['id'] = { description: "Contact ID" }
*/);

router.put(
  '/:id',
  update
  /*
    #swagger.tags = ['Contacts']
    #swagger.path = '/contacts/{id}'
    #swagger.summary = 'Update a contact'
    #swagger.parameters['id'] = { description: "Contact ID" }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Update a contact',
      schema: {
        $email: "john.doe@example.com",
        $birthday: "1990-12-31",
        $favoriteColor: "Blue",
        $firstName: "John",
        $lastName: "Doe",
        $fullName: "John Doe",
        $age: 34,
      }
    }
    #swagger.responses[200] = { description: 'Contact updated successfully' }
*/);

router.delete(
  '/:id',
  destroy
  /*
    #swagger.tags = ['Contacts']
    #swagger.path = '/contacts/{id}'
    #swagger.summary = 'Delete a contact'
    #swagger.parameters['id'] = { description: "Contact ID" }
    #swagger.responses[204] = { description: 'Contact deleted' }
*/);

module.exports = router;