const express = require('express'); //Importa express e cors
const cors = require('cors');
const routes = require('./routes');

//Define a porta em que o backend roda
const port = process.env.PORT || 3333; 

//Define o uso do cors, express e json
const app = express();

app.use(cors());  
app.use(express.json());
app.use(routes);

//Começa a aplicação
app.listen(port, () => {
  console.log('Server listening on port ' + port);
})

