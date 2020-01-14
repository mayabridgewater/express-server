const {connection} = require('./config');

function registerUser({role_id, first_name, last_name, email, password, phone}) {
    return new Promise ((resolve, reject) => {
        connection.query(`call register_user(?, ?, ?, ?, ?, ?)`, [role_id, first_name, last_name, email, password, phone], 
          function(error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
          });
    });
};

function updateUserHist(user_id, status, description) {
    return new Promise((resolve, reject) => {
        connection.query(`call update_user_stat_hist(?, ?, ?)`, [user_id, status, description], function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
};

module.exports = {
    registerUser,
    updateUserHist
}