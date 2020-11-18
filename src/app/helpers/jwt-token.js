const jwt = require("jwt-simple");
const moment = require("moment");
const { JWT_SECRET } = require("../certificates/jwt-config");

exports.CreateToken = async (idUser, Rol, idvendor) => {
  var payload = {
    sub: idUser,
    rol: Rol,
    idvendor: idvendor,
    iat: moment().unix(),
    exp: moment().add(9, "hours").unix(),
  };

  return jwt.encode(payload, JWT_SECRET);
};
