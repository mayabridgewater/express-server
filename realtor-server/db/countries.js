const {connection} = require('./config');

function getCountries() {
    return new Promise((resolve, reject) => {
        connection.query(`select name, id from countries`, function(error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        });
    });
};

module.exports = {
    getCountries
}