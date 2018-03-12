const mysql = require('mysql');
const checkValid = require('./checkValid');
const config = require('./config.json');

var auth = (req) => {
    return new Promise((resolve, reject) => {
        var token = checkValid.validQuery(req.url, ['token']);
        if (token) {
            var connection = mysql.createConnection(config);
            connection.connect();
            var query = 'SELECT * FROM users WHERE token = ?';
            connection.query(query, [token.token], (error, results, fileds) => {
                connection.end();
                if (error || results.length === 0) {
                    return reject(new Error('auth'));
                } else {
                    return resolve({ token: token.token, role: results[0].role });
                }
            })
        }
    })
}

module.exports = auth;