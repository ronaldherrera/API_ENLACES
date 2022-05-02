const { votePost } = require('../../db/links/votePost');
// const { validateVotes } = require('../../validators/validateVotes');
const voteLinkController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await votePost(id, userId);

    res.send({
      status: 'ok',
      message: 'Voto enviado',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { voteLinkController };
