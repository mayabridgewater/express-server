const {connection} = require('./config');
const {Builder} = require('./builder');

function getApartments({user_id, address, city, price, number_of_room, number_of_bath, sqft, created_on, sale_status, availability='available', property_type, status_id='pending', page=1, size =3}) {
   return new Promise((resolve, reject) => {
       const {query, params} = new Builder()
                                    .allApartments(page, size)
                                    .userId(user_id)
                                    .byAddress(address)
                                    .cityId(city)
                                    .price(price)
                                    .numRooms(number_of_room)
                                    .numBaths(number_of_bath)
                                    .apartmentSize(sqft)
                                    .created(created_on)
                                    .saleStatus(sale_status)
                                    .availability(availability)
                                    .property(property_type)
                                    .siteStatus(status_id)
                                    .build();
     connection.query(`SELECT a.* from apartments a join cities ci on a.city_id = ci.id join countries co on ci.country_id = co.id ${query}`, params, function (error, results, fields) {
        if (error) reject(error);
        else resolve(results);
    });
  });
};


function byId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Select * from apartments where id = ?`, [apartmentId], function(error, results, fields) {
            if (error) reject(error);
            else resolve(results)
        });
    });
};
   
function addApartment(id, {address, city, price, rooms, baths, sqft, description, sale_status, availability, property_type, main_image, status = 'pending'}) {
    return new Promise((resolve, reject) => {

        connection.query(`call add_apartment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, address, city, price, rooms, baths, sqft, description, sale_status, availability, property_type, main_image, status], 
        function(error, results, fields) {

            if (error) reject(error);
            else resolve(results)
        });
    });
};

function updateApartmentHistory(apartmentId, userId, status, description) {
    return new Promise((resolve, reject) => {
        connection.query(`call update_apartment_hist(?, ?, ?, ?)`, [apartmentId, userId, status, description], function(error, results, feilds) {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    });
};

module.exports = {
    getApartments,
    byId,
    addApartment,
    updateApartmentHistory

module.exports = {
    getApartments,
    byId,
    addApartment

}