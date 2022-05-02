//REQUERIMIENTOS
///conecta con el modulo joi
const joi = require('@hapi/joi');
///conecta con las funciones del archivo "../helpers"
const { generateError } = require('../helpers');
///conecta con las funciones del archivo "../db/tweets"
const {
  createlink,
  getAllLinks,
  getLinkById,
  createLike,
  deleteLinkById,
} = require('../db/links');

//FUNCION PARA CONTROLAR LOS LINKS NUEVOS
const newLinkController = async (req, res, next) => {
  console.log('pasamos por el controlador de nuevos links');
  try {
    const { titulo, url, description } = req.body;
    const like = 0;

    /////////////valida datos
    //requisitos para validar el titulo
    const validationtitulo = joi.string().max(30);
    let validetitulo = validationtitulo.validate(titulo);
    if (validetitulo.error) {
      throw generateError(
        'Debes introducir un titulo, de 30 caracteres como máximo',
        400
      );
    }
    //requisitos para validar la url
    const validationUrl = joi.string().uri();
    let valideUrl = validationUrl.validate(url);
    if (valideUrl.error) {
      throw generateError('Debes introducir una url correca', 400);
    }
    //requisitos para validar la descripcion
    const validationdescription = joi.string().max(280);
    let validedescription = validationdescription.validate(description);
    if (validedescription.error) {
      throw generateError(
        'Debes introducir una descripción, de 280 caracteres como máximo',
        400
      );
    }

    const id = await createlink(req.userId, like, titulo, url, description);

    res.send({
      status: 'ok',
      message: `Link con id: ${id} creado`,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR LINK INDIVIDUAL
const getSingleLinkController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un link');

  try {
    const { id } = req.params;
    const link = await getLinkById(id);

    res.send({
      status: 'ok',
      message: link,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR LOS LIKES DE UN LINK INDIVIDUAL
///añadir o quitar like
const likesController = async (req, res, next) => {
  console.log('pasamos por el controlador LIKES DE UN LINK INDIVIDUAL ');
  console.log(req.body);
  console.log(req.params);
  try {
    const { likes } = req.body;
    const { id } = req.params;
    const vote = await createLike(id, likes);
    //const { likes, links_id, user_id } = req.body;

    //const likess = await createLike(req.likeId, likes, links_id, user_id);

    /*if (!req.body || !req.body.likes) {
      likes = `default`;
    }*/
    res.send({
      status: 'ok',
      message: vote,
    });
  } catch (error) {
    next(error);
  }
};
////////*/

//FUNCION PARA CONTROLAR TODOS LOS LINKS
const getLinksController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar los links');
  try {
    const links = await getAllLinks();

    res.send({
      status: 'ok',
      data: links,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR EL BORRADO DE LINKS
const deleteLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;

    ///consigue la información del link que quiero borrar
    const link = await getLinkById(id);

    ///comprueba que el usuario del token es el mismo que el que creó el link
    if (req.userId !== link.user_id) {
      throw generateError('No puedes borrar un link que no es tuyo', 401);
    }

    ///borra el link
    await deleteLinkById(id);

    res.send({
      status: 'ok',
      message: `El link con id: ${id} se ha borrado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  newLinkController,
  getLinksController,
  getSingleLinkController,
  likesController,
  deleteLinkController,
};
