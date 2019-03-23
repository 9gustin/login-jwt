var express = require('express');

var Router = express.Router();

var UserController = require('../controllers/user.controller');

Router.post('/', UserController.postUser);
Router.get('/', UserController.getUsers);

module.exports = Router;