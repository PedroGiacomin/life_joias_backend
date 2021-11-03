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
ProductController.getById);

routes.post('/products', ProductValidator.create,  
ProductController.create);

routes.put('/products/:product_id', ProductValidator.update, 
ProductController.update);

routes.delete('/products/:product_id', ProductValidator.delete,
//auth.authenticateToken, 
ProductController.delete);

//Pega por query
routes.get('/products', ProductValidator.getByCategoria, ProductController.getByCategoria);


//Clientes
//Exige autenticacao
routes.get('/users/:user_id',
  UserValidator.getById, 
  auth.authenticateToken, 
  UserController.getById);

routes.get('/users/:user_email',
  //UserValidator.getById, 
  //auth.authenticateToken, 
  UserController.getByEmail);

routes.post('/users', 
  UserValidator.create, 
  UserController.create);
  
routes.put('/users/:user_id', 
  UserValidator.update, 
  auth.authenticateToken, 
  UserController.update);
routes.delete('/users/:user_id', 
  UserValidator.delete, 
  auth.authenticateToken, 
  UserController.delete);



module.exports = routes;