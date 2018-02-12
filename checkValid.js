var url = require('url');
var qs = require('querystring');

// Kiem tra tinh hop le chuoi truy van GET
var validQuery = (data, property) => {
    var result = {};
    // Khac phuc van de querystring.parse() tra ve object khong co prototype
    result = Object.assign(result, qs.parse(url.parse(data).query));
    // Kiem tra so luong key trong truy van
    if (Object.keys(result).length !== property.length) {
        return false;
    }
    // Kiem tra tinh hop le cua key
    for (var v of property) {
        if (!result.hasOwnProperty(v) || result[v].trim().length === 0) {
            return false;
        }
    }
    return true;
}

// Kiem tra tinh hop le chuoi JSON POST
var validJSON = (data, property) => {
    var result;
    // Dung try/catch de kiem tra tinh hop le chuoi JSON
    try {
        result = JSON.parse(data);
        // Kiem tra so luong thuoc tinh trong JSON
        if (Object.keys(result).length !== property.length) {
            throw new Error('Invalid length');
        }
        // Kiem tra tinh hop le cua thuoc tinh
        for (var v of property) {
            if (!result.hasOwnProperty(v) || result[v].trim().length === 0) {
                throw new Error('Invalid property');
            }
        }
    } catch (error) {
        return false;
    }
    return result;
}

module.exports = {
    validQuery: validQuery,
    validJSON: validJSON
}