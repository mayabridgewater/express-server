const {connection} = require('./config');

function getCityByCountry(id) {
    return new Promise((resolve, reject) => {
        connection.query(`select city_name, id from cities where country_id = ?`, [id], function(error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    })
};

module.exports = {
    getCityByCountry
}