const {connection} = require('./config');

function postImages(id ,images) {
    let query = '';
    let params = [];
    for (let i = 0; i < images.length; i++) {
        if (i === images.length-1) {
            query += `(default, ?, ?)`;
            params.push(id);
            params.push(images[i])
        } else {
            query += `(default, ?, ?), `;
            params.push(id);
            params.push(images[i]);
        }
    } 
    return new Promise((resolve, reject) => {
        connection.query(`insert into images (id, apartment_id, url) values ${query}`, params, function(error, results, fields) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log(results)
                resolve(results)
            }
        })
    })
}

function getImages(id) {
    return new Promise((resolve, reject) => {
        connection.query(`select * from images where apartment_id = ?`, id, function(error, results, fields) {
            if (error) {
                console.log(error);
                reject(error)
            }else {
                console.log(results);
                resolve(results)
            }
        })
    })
}

module.exports = {
    postImages,
    getImages
}