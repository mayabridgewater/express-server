const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'fattyb10',
  database : 'realtor'
});

connection.connect(err => err? console.log(err) : console.log('success'));

function getApartments(...search) {
    if (search.length === 0) {
      const promise = new Promise((resolve, reject) => {
          connection.query('SELECT * from apartments', function (error, results, fields) {
              if (error) reject(error);
              else resolve(results);
            });
      });
      return promise
    } else {
      const filterOptions = search.join();
      console.log(filterOptions);
      const promise = new Promise((resolve, reject) => {
        connection.query(`SELECT * from apartments a join cities ci on a.city_id = ci.id join countries co on ci.country_id = co.id ${filterOptions}`, function (error, results, fields) {
            if (error) reject(error);
            else resolve(results);
          });
    });
    return promise
    }
};
   


  module.exports = {
    getApartments
  }