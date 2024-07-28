const {Router} = require('express');
const UserController = require('../controllers/UserController')

const usersRoutes = new Router;

usersRoutes.post('/register', UserController.register);
usersRoutes.post('/login', UserController.login);

module.exports = usersRoutes