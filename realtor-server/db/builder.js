class Builder {
    constructor() {
        this.query = '',
        this.params = []
    }
    allApartments(page, size) {
        this.query += ' limit ?, ?';
        this.params.push((page-1)*size);
        this.params.push(size);
        return this
    }
    userId(userId) {
        if(userId) {
            this.query += ' and U.user_id = ?';
            this.params.push(userId);
            return this
        }
        return this
    }
    cityId(city) {
        if (city) {
            this.query += ' and A.city_id = ?';
            this.params.push(city);
            return this
        }
        return this
    }
    minPrice(min_price) {
        if (min_price) {
            this.query += ' and price > ?';
            this.params.push(min_price)
        }
        return this
    }
    maxPrice(max_price) {
        if (max_price) {
            this.query += ' and price < ?';
            this.params.push(max_price)
        }
        return this
    }
    numRooms(rooms) {
        if (rooms) {
            this.query += ' and number_of_room >= ?';
            this.params.push(rooms);
            return this
        }
        return this
    }
    numBaths(baths) {
        if (baths) {
            this.query += ' and number_of_bath >= ?';
            this.params.push(baths);
            return this
        }
        return this
    }
    apartmentSize(sqft) {
        if (sqft) {
            this.query += ' and sqft >= ?';
            this.params.push(sqft);
            return this
        }
        return this
    }
    created(date) {
        if (date) {
            this.query += ' and created_on >= ?';
            this.params.push(date);
            return this
        }
        return this
    }
    saleStatus(status) {
        if (status) {
            this.query += ' and sale_status = ?';
            this.params.push(status);
            return this
        }
        return this
    }
    availability(type) {
        this.query += 'Where availability = ?';
        this.params.push(type);
        return this
    }
    property(type) {
        if (type) {
            this.query += ' and property_type = ?';
            this.params.push(type);
            return this
        }
        return this
    }
    siteStatus(status) {
        this.query += ' and status = ?';
        this.params.push(status);
        return this
    }
    build() {
        return {
            query: this.query, 
            params: this.params
        }
    }
}

module.exports = {
    Builder
}