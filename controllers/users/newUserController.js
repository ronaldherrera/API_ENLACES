const { validateLogin } = require('../../validators/validateLogin');
const { createUser } = require('../../db/users/createUser');

const newUserController = async (req, res, next) => {
  try {
    let { email, password, userName, nombre } = req.body;
    const validate = await validateLogin(email, password);
    if (!userName) {
      userName = nombre;
    }
    const id = await createUser(
      validate.value.email,
      validate.value.password,
      userName,
      nombre
    );
    res.send({
      status: 'ok',
      message: `Usuario creado con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { newUserController };
