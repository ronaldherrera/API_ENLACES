//REQUERIMIENTOS
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
//const { send } = require('process');

///conecta con el fichero "users" de "controllers"
const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

///conecta con el fichero "links" de "controllers"
const {
  newLinkController,
  getLinksController,
  getSingleLinkController,
  deleteLinkController,
} = require('./controllers/links');

const app = express();

//APPS
app.use(morgan('dev'));
//app.use(express.json());

//RUTAS DE USERS
app.post('/user', newUserController); //listo
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//RUTAS DE LINKS
app.post('/', newLinkController);
app.get('/', getLinksController);
app.get('/link/:id', getSingleLinkController);
app.delete('/link/:id', deleteLinkController);

//MIDDLEWARE DE 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'not found',
  });
});

//MIDDLEWARE PARA LA GESTION DE ERRORES
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

//LANZAMOS
app.listen(3000, () => {
  console.log('servidor funcionando!');
});
