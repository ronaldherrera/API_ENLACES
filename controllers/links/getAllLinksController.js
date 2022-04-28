const { getAllPost } = require('../../db/links/getAllPost');

const getAllLinksController = async (req, res, next) => {
  try {
    const links = await getAllPost();
    res.send({
      status: 'ok',
      data: links,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllLinksController };
