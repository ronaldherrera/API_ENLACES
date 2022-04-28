require('dotenv').config();
const express = require('express');
const expressFileUpload = require('express-fileupload');
const morgan = require('morgan');
const { authUser } = require('./middlewares/auth');
const { getUserController } = require('./controllers/users/getUserController');
const { loginController } = require('./controllers/users/loginController');
const { newUserController } = require('./controllers/users/newUserController');
const {
  userProfileController,
} = require('./controllers/users/userProfileController');

const {
  voteLinkController,
} = require('./controllers/links/voteLinkController');
const { newLinkController } = require('./controllers/links/newLinkController');
const {
  getAllLinksController,
} = require('./controllers/links/getAllLinksController');
const {
  deleteLinkController,
} = require('./controllers/links/deleteLinkController');

const app = express();
app.use(expressFileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

///USER

app.post('/user', newUserController);
app.post('/login', loginController);
app.get('/user/:id', getUserController);
app.post('/user/:id/settings', authUser, userProfileController);

//LINKS
app.post('/', authUser, newLinkController);
app.get('/', getAllLinksController);
app.delete('/link/:id', authUser, deleteLinkController);
app.post('/link/:id', voteLinkController);

//Middleware de error 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});
//Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

app.listen(3000, () => {
  console.log(`Servidor en localhost:3000`);
});
