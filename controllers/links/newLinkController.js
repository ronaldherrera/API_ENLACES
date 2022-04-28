const { createPost } = require('../../db/links/createPost');
const { validateUrl } = require('../../helpers');

const newLinkController = async (req, res, next) => {
  try {
    const { url, titulo, descripcion } = req.body;
    const validate = await validateUrl(url);
    const id = await createPost(
      req.userId,
      validate.value,
      titulo,
      descripcion
    );
    res.send({
      status: 'ok',
      message: `Post con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { newLinkController };
