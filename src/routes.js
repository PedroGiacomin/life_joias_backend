const express = require('express');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');

const routes = express.Router();
/*
  
  {
    "product_nome" : "Anel Splindow",
    "product_preco" : 10.99,
    "product_tamanho" : 15,
    "product_imagem" : "./anel1.png",
    "product_descricao" : "Anelzassooo",
    "product_categoria" : "joia",
    "product_subcategoria": "anel"
  }

  {
    "user_nome" : "Zé Carlos",
    "user_email" : "emaildozecarlos",
    "user_telefone" : "999999999",
    "user_nascimento" : "1999-03-12",
    "user_cep" : "12345678",
    "user_numero" : "456",
    "user_bairro" : "Lagoa Grande",
    "user_cidade": "Padimina",
    "user_estado" : "Minas Gerais",
    "user_senha": "batatinha123"
  }
  

 
 */ 

//Produtos
routes.get('/products/:product_id', ProductController.getById);
routes.post('/products',  ProductController.create);
routes.put('/products/:product_id',  ProductController.update);
routes.delete('/products/:product_id',  ProductController.delete);

//Pegam por query
routes.get('/products', ProductController.getByCategoria);
routes.get('/products', ProductController.getByCatSubcat);


//Clientes
routes.get('/users/:user_id', UserController.getById);
routes.post('/users',  UserController.create);
routes.put('/users/:user_id',  UserController.update);
routes.delete('/users/:user_id', UserController.delete);

module.exports = routes;