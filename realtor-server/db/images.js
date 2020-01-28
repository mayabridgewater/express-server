const {connection} = require('./config');

function postImages(id ,images) {
    let query = '';
    let params = [];
    for (let i = 0; i < images.length; i++) {
        if (i === images.length-1) {
            query += `(default, ?, ?)`;
            params.push(parseInt(id));
            params.push(images[i])
        } else {
            query += `(default, ?, ?), `;
            params.push(parseInt(id));
            params.push(images[i]);
        }
    }
    return new Promise((resolve, reject) => {
        connection.query(`insert into images (id, apartment_id, url) values ${query}`, params, function(error, results, fields) {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                console.log(results)
                resolve(results)
            }
        })
    })
}

function getAllImages() {
    return new Promise((resolve, reject) => {
        connection.query(`select * from images`, function(error, results, fields) {
            if(error) {
                reject(error)
            }else{
                resolve(results)
            }
        })
    })
}

function getImagesById(id) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from images where apartment_id = ?`, [id], function(error, results, fields) {
            if (error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
}

function deleteImages(id, images) {
    let query = `delete from images where id not in (`;
    let params = [];
    for (let i = 0; i < images.length; i++) {
        if (images.length === 1) {
            query += `?)`;
            params.push(images[i])
        }else if (i === 0) {
            query += `?`;
            params.push(images[i])
        }else if (i === images.length - 1) {
            query + `, ?)`;
            params.push(images[i])
        }else {
            query += `, ?`;
            params.push(images[i])
        }
    }
    return new Promise((resolve, reject) => {
        connection.query(query, params, function(error, results, fields) {
            if (error) {
                console.log(error)
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
}

module.exports = {
    postImages,
    getImagesById,
    getAllImages,
    deleteImages
}