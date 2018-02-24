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
        if (error.code === 'ER_DUP_ENTRY') {
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

module.exports = { createCompany };