const { validateLogin } = require('../../helpers');
const { createUser } = require('../../db/users/createUser');

const newUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validate = await validateLogin(email, password);

    const id = await createUser(validate.value.email, validate.value.password);
    res.send({
      status: 'ok',
      message: `Usuario creado con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { newUserController };
