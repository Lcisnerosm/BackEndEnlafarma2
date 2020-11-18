const bcrypt = require('bcryptjs');
const { Login } = require('../controllers/auth.controller');
const db = require("../database/database");
const authStorage = {};

authStorage.get = async (email) => {
    console.log(email);
    return new Promise((resolve, reject) => {
        db.query(
            `
            SELECT l.idLogin,  l.email, l.password, r.name AS rol, v.idvendor FROM login l
            INNER JOIN roles r ON r.idroles = l.roles_idroles
            INNER JOIN vendors v ON v.idvendor = l.vendors_idvendor
            WHERE l.email = ?;`,
            [email],
            (err, results) => {
                if (err) {
                    if (err.errno) {
                        reject({
                            code: err.errno,
                        });

                    }

                    reject(err);
                }
                console.log(results)
                if (results) {
                    if (results.length == 0) {
                        reject({
                            code: 404,
                        });
                    }
                }

                resolve(results[0]);
            }
        );
    });
};

authStorage.create = async (idUserLogin, email, password, rol, idvendor) => {
    console.log(idUserLogin, email, password, rol, idvendor);
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 12, function (err, hashPass) {
            db.query(`
            INSERT INTO login (idLogin, email, password, roles_idroles, vendors_idvendor)
            VALUES (?, ?, ?, ?, ?);`, [idUserLogin, email, hashPass, rol, idvendor], (err, results) => {
                if (err) {
                    console.log(err)
                    if (err.errno) {
                        reject({
                            code: err.errno,
                        });

                    }

                    reject(err);
                }
                console.log(results)

                // if(results){
                //     if(results.length ==0){
                //         reject()
                //     }
                // }

                resolve({
                    id: idUserLogin,
                    email: email
                })
            })
        });
    })
}

module.exports = authStorage;
