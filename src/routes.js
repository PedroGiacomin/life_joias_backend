const express = require('express');
const routes = express.Router();

const auth = require("./middlewares/authentication");

const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');

 
const UserValidator = require("./validators/UserValidator");
const ProductValidator = require('./validators/ProductValidator')


const SessionController = require("./controllers/SessionController");

//session

routes.post("/login", SessionController.signIn);

//Produtos
routes.get('/products/:product_id', ProductValidator.getById, 
//auth.authenticateToken, 
ProductController.getById);

routes.post('/products', ProductValidator.create, 
//auth.authenticateToken, 
ProductController.create);

routes.put('/products/:product_id', ProductValidator.update, 
//auth.authenticateToken, 
ProductController.update);

routes.delete('/products/:product_id', ProductValidator.delete,
//auth.authenticateToken, 
ProductController.delete);

//Pega por query
routes.get('/products', ProductValidator.getByCategoria, ProductController.getByCategoria);


//Clientes
routes.get('/users/:user_id', auth.authenticateToken, UserController.getById);
routes.post('/users',  UserController.create);
routes.put('/users/:user_id', auth.authenticateToken, UserController.update);
routes.delete('/users/:user_id',auth.authenticateToken, UserController.delete);
routes.get('/users', 
  //auth.authenticateToken, 
  UserController.getByEmail);


module.exports = routes;