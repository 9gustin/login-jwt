var express = require('express');

var Router = express.Router();

var UserController = require('../controllers/user.controller');

Router.post('/', UserController.postUser);
Router.get('/', UserController.getUsers);
Router.post('/login/', UserController.LoginUser);


module.exports = Router;