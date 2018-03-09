const mysql = require('mysql');
const config = require('../config.json');

var createCompany = (token, data) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = 'SELECT * FROM users WHERE token = ?';
        connection.connect();
        // Kiem tra token co ton tai hay khong
        connection.query(query, [token.token], (error, results, fileds) => {
            // Neu xay ra loi hoac token khong ton tai hoac token khong phai la admin
            if (error || results.length === 0 || results[0].role !== 'ADMIN') {
                connection.end();
                return reject(new Error('Unauthorized'));
            }
            var query2 = 'INSERT INTO airline_company(airline_name, city_name) VALUES (?, ?)';
            // Tao them airline company
            connection.query(query2, [data.airline_name, data.city_name], (error, results, fileds) => {
                connection.end();
                if (error) {
                    return reject(error.code);
                }
                return resolve(results.insertId);
            })
        })
    })
}

var createFlight = (token, data) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = 'SELECT * FROM users WHERE token = ?';
        connection.connect();
        // Kiem tra token co ton tai hay khong
        connection.query(query, [token.token], (error, results, fileds) => {
            // Neu xay ra loi hoac token khong ton tai hoac token khong phai la admin
            if (error || results.length === 0 || results[0].role !== 'ADMIN') {
                connection.end();
                return reject(new Error('Unauthorized'));
            }
            var query2 = 'INSERT INTO airline_flight(from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            // Tao them airline company
            connection.query(query2, [data.from_date, data.to_date, data.flight_time, data.arrival_time, data.from_city_name, data.to_city_name, data.airline_id, data.price], (error, results, fileds) => {
                connection.end();
                if (error) {
                    return reject(error.code);
                }
                return resolve(data.airline_id);
            })
        })
    })
}

var getFlights = (params) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
		connection.connect();

		//lay danh sach chuyen bay theo 3 dieu kien
		var sql_flights = 'SELECT * FROM airline_flight WHERE (from_city_name = ?) AND (to_city_name = ?)';
			
		
		connection.query(sql_flights, [params.departure_city_name, params.desitination_city_name], (error, results, fileds) => {
			
			console.log(results);return true;
				connection.end();
				if (error) {
					return reject(error.code);
				}
				return resolve(results);
		
        
		})
	})
}

module.exports = { createCompany, createFlight, getFlights };