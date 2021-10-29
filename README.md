# Workflow back-end

## Setup inicial
  - Cria o diretorio do backend
  ```````
  npm init -y
  ```````
  - Cria o src/index.js
  - Instala o express e cors

  ```````
  npm i cors express
  ```````
  
  - No index.js

  ```````
  const express = require('express'); //Importa express e cors
  const cors = require('cors');
  const routes= require('./routes')

  //Define a porta em que o backend roda
  const port = process.env.PORT || 3333; 

  //Define o uso do cors, express e json
  const app = express();

  app.use(cors());  
  app.use(express.json());

  //Começa a aplicação
  app.listen(port, () => {
    console.log('Server listening on port ' + port);
  })

  ```````

  - Define o script start no package.json

  ````
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon src/index.js"
  },
  ````
  > O nodemon ainda nao foi instalado, mas eh pq vai usar ele pra inicializar.

  - Instala o nodemon
  
  ````
  npm i nodemon
  ````

  - Cria o .gitgnore e coloca ``node_modules`` nele.

## Banco de dados

  É no banco de dados que são de fato guardados os dados. Bancos SQL (que é o que vai ser usado), armazenam informações em tabelas. 
  
  - Estruturar o banco de dados em UML (entidades e relações)
    + PK (primary key): identificação primária da entidade, é única para CADA entidade.
    + FK (foreign key): ponteiro para uma outra entidade, seu valor deve ser uma propriedade da outra entidade.

  - Precisa instalar um banco de dados SQL para a aplicação. No nosso caso usamos o Sqlite3. 
  - Para fazer a comunicação com o banco de dados, usamos um _query builder_, que usa JS para fazer a comunicação. No nosso caso usamos o knex

  ```
  npm install knex sqlite3
  ```
### Migrations

É um sistema de versionamento do banco de dados, que fica local no computador. Têm duas funções principais:
  - Up: usada quando se está carregando a migration, como uma nova versão.
  - Down: usada quando se está revertendo as alterações daquela migration.

A cada nova alteração na modelagem é **criada uma nova migration**. Ou seja, sempre que for mudar alguma coisa no DB (adicionar uma coluna na tabela, criar uma tabela nova, etc) tem que criar uma nova migration.

- "Instala" as migrations

```
  npx knex init
```
- Configura as migrations no knexfile.js
```
 migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
    pool:{
      afterCreate: (conn, cb) =>
        conn.run('PRAGMA foreign_keys = ON', cb)
    }
  }
```
- Para criar uma migration usa ``npx knex migrate:make <nome da migration(tipo um commit)>``

- Tudo que for feito no _up_ tem que ser desfeito no _down_.

- Para rodar todas as migrations que ainda não foram, usa ``npx knex migrate:latest``.

### Conexão com o DB

O banco de dados já está **criado**, com as tabelas e etc, mas nosso código ainda não sabe se comunicar com ele. 

- Para estabelecer essa conexão, é criado o arquivo ``src/database/connection.js``
```
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
console.log(configuration);

const connection = require('knex')(configuration);
module.exports = connection;
```
>Código bem padrão

## Models

Usamos js para realizar operações dentro do DB. Para isso, são criados os _models_, que são scripts **para cada uma das tabelas do DB** que definem as funções que vão ser utilizadas para interagir com elas.

Para a maior parte das tabelas, temos funções para 
      - **C**reate
      - **R**ead
      - **U**pdate
      - **D**elete

- Cria a pasta src/models
- Cria um JS para cada tabela do DB, e importa o arquivo connection

```
const connection = require("../database/connection");
```

## Rotas

Meio com que uma aplicação externa se comunica com o seu back-end. É basicamente o que se coloca na barra do navegador.

O navegador faz uma requisição para a rota que você colocou e ela retorna alguma coisa como se fosse uma função.

Métodos HTTP - métodos de requisição
      - GET: buscar informações do back-end
      - POST: criar informações no back-end
      - PUT: alterar informações do back-end
      - DELETE: deleta informações no back-end
  > Só a GET funciona no navegador, por isso usamos insomnia.

Ao usar um método desses, passa uma callback function que tem como parâmetros um objeto request e um objeto response.
      - req: O request vem da aplicação externa, nele tem as informacoes passadas por ela.
      - res: Define a resposta que quem fez a requsição vai receber.

- Cria o ``src/routes.js``
- Importa o routes no index.js ``const routes= require('./routes')``

### Params

É quando passamos variáveis pela rota, (e.g. uma ID de usuário).

- Query Params: Parametros nomeados enviados NA ROTA apos o simbolo de "?" (filtros, paginacao) ex: ``/users?name=Diego``

- Route Params: Parametros utilizados para identificar RECURSOS com um id depois de "/:"
ex: ``/users/:nome``

- Request Body: Corpo da requisição, utilizado para criar ou alterar recursos, tudo que for escrito na requisição é guardado nele. ``req.body``

## Controllers

Para não ficar muito código dentro da routes.js, cria um arquivo pra ter as funcionalidades de cada rota e só chama essas funções dentro do routes.

O que queremos com o controller é relacionar **AS ROTAS** com o banco de dados. Para comunicar com o banco de dados tem que usar os Models, criados anteriormente. 

O que as funções do controller vao fazer, na verdade, é chamar as funções dos models para criar novas coisas no banco de dados.

- Cria src/controllers e um controller para cada entidade.
- Importa os models correspondentes.

RESUMINDO: 
- Os models são o back-end que se conecta diretamente com o banco de dados e atua nele.
- Os controllers usam os models para fazer as alterações. 
- As rotas usam os controllers.
- Estabelecida a ponte entre rota -> database.

## Middleware

Uma funcionalidade que coloca na rota para ser "checada" antes de ir para a função do controller. e.g. - validação, upload de imagens.

### Validator

Uma função chamada para saber se as informações na requisição estão sendo enviadas de maneira correta.

É como um tratamento de exceções, valida a entrada do usuário/da requisição.

- Instala a lib _celebrate_ ``npm install celebrate``.
- Importar o _errors_ do _celebrate_ no index.js 
```
const { errors } = require('celebrate');
app.use(errors());
```

- Cria uma pasta src/validators e um arquivo js de validator pra cada uma das entidades.
- Importa o celebrate nos validators
``const { celebrate, Segments, Joi} = require('celebrate');``
>O celebrate cuida mais do middleware, o Joi que cuida mesmo da validação.

- Importa os validators na routes.js

## Firebase

API da google, pode usar como banco de dados, etc. Usamos como método de login e logout, oferece toda

- Cria o projeto na Firebase
- Cria src/utils/Firebase.js
- Instala o firebase ``npm install firebase``
- Instala o ``dotenv`` e cria o .env 
> .env guarda variáveis de ambiente da aplicação, variáveis secretas.

- Bota o .env no gitignore
- Bota ``require('dotenv').config();`` no index.js

