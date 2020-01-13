const {connection} = require('./config');

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
    checkPermissions
}