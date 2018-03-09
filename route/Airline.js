const checkValid = require('../checkValid');
const airlineDB = require('../database/Airline');

var createCompany = async (req, res, data) => {
    try {
        // Kiem tra token
        var token = checkValid.validQuery(req.url, ['token']);
        // Kiem tra tinh hop le cua JSON do Client gui len
        // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'airline_name' va 'city_name'
        var data = checkValid.validJSON(data, ['airline_name', 'city_name']);
        if (req.method === 'POST' && token && data) {
            var resultDB = await airlineDB.createCompany(token, data);
            res.writeHead(200);
            var result = {
                message: 'Create success',
                id: resultDB
            }
            result = JSON.stringify(result);
            res.write(result);
        } else {
            // Truong hop JSON gui len khong hop le
            throw new Error('error');
        }
    } catch (error) {
        var result;
        // Truong hop trung airline_name
        if (error === 'ER_DUP_ENTRY') {
            res.writeHead(422);
            result = { message: 'Data cannot be processed' };
        } else {
            res.writeHead(401);
            result = { message: 'Invalid login' };
        }
        result = JSON.stringify(result);
        res.write(result);
        throw error;
    }
}

var createFlight = async (req, res, data) => {
    try {
        // Kiem tra token
        var token = checkValid.validQuery(req.url, ['token']);
        // Kiem tra tinh hop le cua JSON do Client gui len
        // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'airline_name' va 'city_name'
        var data = checkValid.validJSON(data, ['from_date', 'to_date', 'flight_time', 'arrival_time', 'from_city_name', 'to_city_name', 'airline_id', 'price']);
        if (req.method === 'POST' && token && data) {
            // Kiem tra ngay thang va so nguyen cua du lieu
            data.from_date = checkValid.validDate(data.from_date);
            data.to_date = checkValid.validDate(data.to_date);
            data.price = checkValid.validInt(data.price);
            if (data.from_date && data.to_date && data.price) {
                var resultDB = await airlineDB.createFlight(token, data);
                res.writeHead(200);
                var result = {
                    message: 'Create success',
                    id: resultDB
                }
                result = JSON.stringify(result);
                res.write(result);
            } else {
                throw new Error('ER_DUP_ENTRY');
            }
        } else {
            // Truong hop JSON gui len khong hop le
            throw new Error('error');
        }
    } catch (error) {
        var result;
        // Truong hop trung airline_id hoac du lieu khong hop le
        if (error === 'ER_DUP_ENTRY' || error.message === 'ER_DUP_ENTRY') {
            res.writeHead(422);
            result = { message: 'Data cannot be processed' };
        } else {
            res.writeHead(401);
            result = { message: 'Invalid login' };
        }
        result = JSON.stringify(result);
        res.write(result);
        throw error;
    }
}

var getFlights = async (req, res, data) => {
    try {
                
        if (true) {
			
            var resultDB = await airlineDB.getFlights(data);
            res.writeHead(200);
            var result = {
                message: 'Query success',
                id: resultDB
            }
			console.log(resultDB);return true;
            result = JSON.stringify(result);
            res.write(result);
        } else {
            // Truong hop JSON gui len khong hop le
            throw new Error('error');
        }
    } catch (error) {
        
    }
}


module.exports = { createCompany, createFlight, getFlights };