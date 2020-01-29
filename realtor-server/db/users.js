const {connection} = require('./config');

const {UserBuilder} = require('./userBuilder');


function getUsers({id, role_id, first_name, last_name, email, phone, status}) {
    const {query, params} = new UserBuilder()
                            .byId(id)
                            .byRoleId(role_id)
                            .byFirstName(first_name)
                            .byLastName(last_name)
                            .byEmail(email)
                            .byPhone(phone)
                            .byStatus(status)
                            .build();
    return new Promise((resolve, reject) => {
        connection.query(`select * from users ${query}`, params, function(error, results, fields) {
            if (error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
};

function updateUserStatus({id, status}) {
    return new Promise((resolve, reject) => {
        connection.query(`update users set status = ? where id = ?`, [status, id], function(error, results, fields) {
            if(error) {
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

function updateHistory({id, status, status_description}) {
    return new Promise((resolve, reject) => {
        connection.query(`call update_user_stat_hist(?, ?, ?)`, [id, status, status_description], function(error, results, fields) {
            if(error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
}

function checkPermissions(permission, currentUser) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT rp.* FROM realtor.roles_permissions rp join permissions p on rp.permission_id = p.id
        where p.title = ? and rp.role_id = ?`, [permission, currentUser.role_id], function(error, results, fields) {
            if (error) reject(error);
            else resolve(results)
        });
    });
};

module.exports = {
    getUsers,
    updateUserStatus,
    updateHistory,
    checkPermissions
}