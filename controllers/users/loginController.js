const { generateError } = require('../../helpers');
const { validateLogin } = require('../../validators/validateLogin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../../db/users/getUserByEmail');
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Comprobar que es un correo y contraseña válidos
    const validate = await validateLogin(email, password);
    //Recoger los datos de la base de datos del usuario con el email
    const user = await getUserByEmail(validate.value.email);

    //Comprobar que la contraseña de la BD y del cliente son la misma
    const validPassword = await bcrypt.compare(
      validate.value.password,
      user.password
    );
    if (!validPassword) {
      throw generateError('La contraseña no coincide', 401);
    }

    //Creación del payload del token
    const payload = { id: user.id };
    //Firmo el  token
    const token = jwt.sign(payload, process.env.SECRET);
    res.send({
      status: 'ok',
      data: token,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { loginController };
