const {connection} = require('./config');
const {Builder} = require('./aptBuilder');

function getApartments({user_id, city, country, min_price, max_price, number_of_room, number_of_bath, sqft, created_on, sale_status, availability, property_type, status, page=1, size}) {
    return new Promise((resolve, reject) => {
       const {query, params} = new Builder()
                                    .availability(availability)
                                    .userId(user_id)
                                    .countryId(country)
                                    .cityId(city)
                                    .minPrice(min_price)
                                    .maxPrice(max_price)
                                    .numRooms(number_of_room)
                                    .numBaths(number_of_bath)
                                    .apartmentSize(sqft)
                                    .created(created_on)
                                    .saleStatus(sale_status)
                                    .property(property_type)
                                    .siteStatus(status)
                                    .allApartments(page, size)
                                    .build();
                        console.log(`SELECT a.*, ci.city_name, co.name, co.code from apartments a join cities ci on a.city_id = ci.id join countries co on ci.country_id = co.id ${query}`, params)
     connection.query(`SELECT a.*, ci.city_name, co.name, co.code from apartments a join cities ci on a.city_id = ci.id join countries co on ci.country_id = co.id ${query}`, params, function (error, results, fields) {
        if (error) {
            reject(error);
        }else {
            resolve(results)
        };
    });
  });
};

function getNumOfApartments({user_id, city, min_price, max_price, number_of_room, number_of_bath, sqft, created_on, sale_status, availability, property_type, status}) {
    return new Promise((resolve, reject) => {
        const {query, params} = new Builder()
                                    .availability(availability)
                                    .userId(user_id)
                                    .cityId(city)
                                    .minPrice(min_price)
                                    .maxPrice(max_price)
                                    .numRooms(number_of_room)
                                    .numBaths(number_of_bath)
                                    .apartmentSize(sqft)
                                    .created(created_on)
                                    .saleStatus(sale_status)
                                    .property(property_type)
                                    .siteStatus(status)
                                    .build();
        connection.query(`select count(*) as count from apartments ${query}`, params, function(error, results, fields) {
            if(error) {
                reject(error)
            }else {
                resolve(results)
            }
        })
    })
}


function byId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Select * from apartments where id = ?`, [apartmentId], function(error, results, fields) {
            if (error) reject(error);
            else resolve(results)
        });
    });
};
   
function addApartment(id, {address, city, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type}, main_image) {
    return new Promise((resolve, reject) => {

        connection.query(`call add_apartment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, address, city, price, number_of_room, number_of_bath, sqft, description, sale_status, property_type, main_image], 
        function(error, results, fields) {
            if (error) {
                reject(error);
            }else {
                resolve(results)
            }
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

function updateApartment({id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, main_image, status}, new_main_image) {
    return new Promise((resolve, reject) => {
        connection.query(`call update_apartment(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [id, address, city_id, price, number_of_room, number_of_bath, sqft, description, sale_status, availability, property_type, new_main_image ? new_main_image : main_image, status], 
            function(error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results)
                }
        });
    });
};


module.exports = {
    getApartments,
    byId,
    addApartment,
    updateApartmentHistory,
    updateApartment,
    getNumOfApartments
}