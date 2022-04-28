const voteLinkController = async (req, res, next) => {
  try {
    res.status({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { voteLinkController };
