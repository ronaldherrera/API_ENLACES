const { userProfile } = require('../../db/users/userProfile');
const { createPathIfNotExists } = require('../../helpers');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const path = require('path');

const userProfileController = async (req, res, next) => {
  try {
    const { nombre, biografia, telefono, direccion } = req.body;
    let imageFileName;
    console.log(req.files);
    if (req.files && req.files.image) {
      //Creo path directorio uploads
      const uploadsDir = path.resolve(__dirname, '../../uploads');
      await createPathIfNotExists(uploadsDir);
      //creo el directorio si no existe
      //Procesar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);
      //Guardarla en el disco con un nombre
      imageFileName = `${nanoid()}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
      console.log(imageFileName);
    }
    await userProfile(
      nombre,
      imageFileName,
      biografia,
      telefono,
      direccion,
      req.userId
    );
    res.send({
      status: 'ok',
      message: `Usuario con id:${req.userId} ha modificado su cuenta.`,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { userProfileController };
