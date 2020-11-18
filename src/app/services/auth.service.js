const uuid = require('uuid')
const authStorage = require("../storage/auth.storage");
const authService = {};

authService.get = async (email) => {
    return await authStorage.get(email);
};

authService.create = async (email, password, rol, idvendor) => {
    let idUser = uuid.v4()
    return await authStorage.create(idUser, email, password, rol, idvendor)
}

module.exports = authService;
