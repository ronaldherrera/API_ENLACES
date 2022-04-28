const { generateError } = require('../../helpers');
const { getSinglePost } = require('../../db/links/getSinglePost');
const { deleteSinglePost } = require('../../db/links/deleteSinglePost');
const deleteLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    //Adquirimos id del post de la BD
    const post = await getSinglePost(id);

    //Comprobar que el usuario del token es el mismo
    if (req.userId !== post.user_id) {
      throw generateError(
        'Estas intentando borrar un post que no es tuyo',
        401
      );
    }
    await deleteSinglePost(id);
    res.send({
      status: 'ok',
      message: `Post con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { deleteLinkController };
