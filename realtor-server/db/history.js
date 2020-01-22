const {connection} = require('./config');

function getAptHistory(id) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from apartment_history where apartment_id = ? order by 6 desc limit 1`, [id], function(error, results, fields) {
            if(error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
};

function getUserHistory({id, label}) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from user_status_history where user_id = ? and label = ?`, [id, label], function(error, results, fields) {
            if(error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    getAptHistory,
    getUserHistory
}