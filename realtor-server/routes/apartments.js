const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', function(req, res, next) {
    if (Object.entries(req.query).length > 0) {
        const search = new BuildSearch();
        for (let key in req.query) {
            if (key === 'page') {
                search.page(req.query.page, req.query.size);
                break;
            } else {
                search[key](req.query[key])
            }
        }
        const result = search.buildSearch()
        db.getApartments(result)
        .then((results) => res.send(results))
    } else {
        db.getApartments()
            .then((results) => res.send(results))
    }
});

class BuildSearch {
    constructor() {
        this.search = []
    }
    city(cityName) {
        this.search.push(` ci.name = '${cityName}'`);
        return this
    }
    country(countryName) {
        this.search.push(` co.name = '${countryName}'`);
        return this
    }
    page(num, size) {
        this.search.push(` limit ${size * (num-1)}, ${size}`);
        return this
    }
    buildSearch() {
        let result = '';
        if (this.search.length === 1) {
            result += this.search[0];
        }else if (this.search.length === 2) {
            result += 'Where';
            result += this.search[0];
            result += ' and';
            result += this.search[1];
        } else {
            result += 'Where';
            for (let i = 0; i < this.search.length; i++) {
                if (i == this.search.length -1) {
                    result += this.search[i]
                } else if (i == 0){
                    result += this.search[i]
                } else {
                    result += ` and ${this.search[i]}`
                }
            }
        }
        return result
    }
}

module.exports = router