'use strict';
const DBConnect = require('./DBConnect');

module.exports = class DBAirline extends DBConnect {
    constructor(param) {
        super();
        this.param = param;
    }

    createCompany() {
        return new Promise((resolve, reject) => {
            var { airline_name, city_name } = this.param;
            var query = 'INSERT INTO airline_company(airline_name,city_name) VALUES(?, ?)';
            this.connection.query(query, [airline_name, city_name], (err, res) => {
                this.connection.end();
                if (err) {
                    return reject(err);
                }
                return resolve(res.insertId);
            })
        })
    }

    createFlight() {
        return new Promise((resolve, reject) => {
            var { from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price } = this.param;
            var query = 'INSERT INTO airline_flight(from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
            this.connection.query(query, [from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price], (err, res) => {
                this.connection.end();
                if (err) {
                    return reject(err);
                }
                return resolve(airline_id);
            })
        })
    }

    getAirline() {
        return new Promise((resolve, reject) => {
            var { departureDate, departureCityName, destinationCityName } = this.param;
            departureDate = departureDate.toISOString().split('T')[0];
            var query = 'SELECT * FROM airline_flight WHERE from_city_name = ? AND to_city_name = ? AND from_date = ?';
            this.connection.query(query, [departureCityName, destinationCityName, departureDate], (err, res) => {
                this.connection.end();
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            })
        })
    }
}