//FUNCION PARA CONTROLAR LOS LINKS NUEVOS
const newLinkController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR TODOS LOS LINKS
const getLinksController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR LINK INDIVIDUAL
const getSingleLinkController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR EL BORRADO DE LINKS
const deleteLinkController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
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
  deleteLinkController,
};
