const {connection} = require('./config');

function login(email, password) {
    return new Promise((resolve, reject) => {
        connection.query('select * from users where email = ? and password = ?', [email, password], function(error, results, fields) {
            if (error) reject(error);
            else resolve(results)
        });
    });
}

module.exports = {
    login
}