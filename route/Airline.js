const checkValid = require('../checkValid');
const DBAirline = require('../database/Airline');

var createCompany = async (req, res, data, auth) => {
    try {
        // Kiem tra tinh hop le cua JSON do Client gui len
        // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'airline_name' va 'city_name'
        var data = checkValid.validJSON(data, ['airline_name', 'city_name']);
        if (req.method === 'POST' && data) {
            var oDBAirline = new DBAirline();
            var resultDB = await oDBAirline.createCompany(auth, data);
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

var createFlight = async (req, res, data, auth) => {
    try {
        // Kiem tra tinh hop le cua JSON do Client gui len
        // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'airline_name' va 'city_name'
        var data = checkValid.validJSON(data, ['from_date', 'to_date', 'flight_time', 'arrival_time', 'from_city_name', 'to_city_name', 'airline_id', 'price']);
        if (req.method === 'POST' && data) {
            // Kiem tra ngay thang va so nguyen cua du lieu
            data.from_date = checkValid.validDate(data.from_date);
            data.to_date = checkValid.validDate(data.to_date);
            data.price = checkValid.validInt(data.price);
            if (data.from_date && data.to_date && data.price) {
                var oDBAirline = new DBAirline();
                var resultDB = await oDBAirline.createFlight(auth, data);
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

var getFlights = async (req, res, segments) => {
    try {
        var data = {
            departure_date: segments[2],
            departure_city_name: segments[3],
            desitination_city_name: segments[4]
        }
        if (!checkValid.validDate(data.departure_date)) {
            //responsive failed
            res.writeHead(422);
            res.write(JSON.stringify({ message: 'Data cannot be processed' }));
            throw new Error('422');
        } else {
            //success
            var oDBAirline = new DBAirline();
            var resultDB = await oDBAirline.getFlights(data);
            res.writeHead(200);
            result = JSON.stringify(resultDB);
            res.write(result);
            res.end();
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { createCompany, createFlight, getFlights };