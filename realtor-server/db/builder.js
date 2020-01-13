class Builder {
    constructor() {
        this.queries = []
    }
    allApartments(page, size) {
        this.queries.push({page: page});
        this.queries.push({size: size});
        return this
    }
    userId(userId) {
        if(userId) {
            this.queries.push({'U.user_id': userId});
            return this
        }
        return this
    }
    byAddress(address) {
        if(address) {
            this.queries.push({address: address});
            return this
        }
        return this
    }
    cityId(city) {
        
        if (city) {
            this.queries.push({'A.city_id': cityId});
            return this
        }
        return this
    }
    price(price) {
        if (price) {
            this.queries.push({price: price});
            return this
        }
        return this
    }
    numRooms(rooms) {
        if (rooms) {
            this.queries.push({number_of_room: rooms});
            return this
        }
        return this
    }
    numBaths(baths) {
        if (baths) {
            this.queries.push({number_of_bath: baths});
            return this
        }
        return this
    }
    apartmentSize(sqft) {
        if (sqft) {
            this.queries.push({sqft: sqft});
            return this
        }
        return this
    }
    created(date) {
        if (date) {
            this.queries.push({created_on: date});
            return this
        }
        return this
    }
    saleStatus(status) {
        if (status) {
            this.queries.push({sale_status: status});
            return this
        }
        return this
    }
    availability(type) {
        this.queries.push({availability: type});
        return this
    }
    property(type) {
        if (type) {
            this.queries.push({property_type: type});
            return this
        }
        return this
    }
    siteStatus(status) {
        this.queries.push({status: status});
        return this
    }
    build() {
        let query = 'Where';
        let params = [];
        let queryList = this.queries.slice(2);
        query += ` ${Object.keys(queryList[0])} = ?`;
        params.push(queryList[0][Object.keys(queryList[0])]);
        for (let i = 1; i < queryList.length; i++) {
            query += ` and ${Object.keys(queryList[i])} = ?`;
            params.push(queryList[i][Object.keys(queryList[i])])
        }
        query += ' Limit ?, ?';
        params.push(((this.queries[0].page)-1)*this.queries[1].size, this.queries[1].size);
        return {query, params}
    }
}

module.exports = {
    Builder
}