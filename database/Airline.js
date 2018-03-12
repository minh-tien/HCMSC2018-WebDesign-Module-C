const mysql = require('mysql');
const config = require('../config.json');

var createCompany = (auth, data) => {
    return new Promise((resolve, reject) => {
        if (auth.role === 'admin') {
            var connection = mysql.createConnection(config);
            connection.connect();
            var query = 'INSERT INTO airline_company(airline_name, city_name) VALUES (?, ?)';
            // Tao them airline company
            connection.query(query, [data.airline_name, data.city_name], (error, results, fileds) => {
                connection.end();
                if (error) {
                    return reject(error.code);
                }
                return resolve(results.insertId);
            })
        } else {
            return reject(new Error('Unauthorized'));
        }
    })
}

var createFlight = (auth, data) => {
    return new Promise((resolve, reject) => {
        if (auth.role === 'admin') {
            var connection = mysql.createConnection(config);
            connection.connect();
            var query = 'INSERT INTO airline_flight(from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            // Tao them airline company
            connection.query(query, [data.from_date, data.to_date, data.flight_time, data.arrival_time, data.from_city_name, data.to_city_name, data.airline_id, data.price], (error, results, fileds) => {
                connection.end();
                if (error) {
                    return reject(error.code);
                }
                return resolve(data.airline_id);
            })
        } else {
            return reject(new Error('Unauthorized'));
        }
    })
}

var getFlights = (params) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        connection.connect();

        //lay danh sach chuyen bay theo 3 dieu kien
        var sql_flights = 'SELECT * FROM airline_flight WHERE (from_city_name = ?) AND (to_city_name = ?)';


        connection.query(sql_flights, [params.departure_city_name, params.desitination_city_name], (error, results, fileds) => {

            console.log(results); return true;
            connection.end();
            if (error) {
                return reject(error.code);
            }
            return resolve(results);


        })
    })
}

module.exports = { createCompany, createFlight, getFlights };