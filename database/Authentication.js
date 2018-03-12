const mysql = require('mysql');
const crypto = require('crypto');
const config = require('../config.json');

var login = (data) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        connection.connect();
        // Kiem tra tai khoan co ton tai hay khong
        //console.log(crypto.createHash('md5').update(data.password).digest('hex'));
        //return true;
        connection.query(query, [data.username, data.password], (error, results, fileds) => {
            // Neu xay ra loi hoac tai khoan khong ton tai
            if (error || results.length === 0) {
                connection.end();
                return reject(error);
            }
            // 'token' chua gia tri bam md5 cua 'username' ket hop voi timestamp
            var token = crypto.createHash('md5').update(data.username + Date.now()).digest('hex');
            var query2 = 'UPDATE users SET token = ? WHERE username = ?';
            // Cap nhat token cho tai khoan
            connection.query(query2, [token, data.username], (error, results2, fileds) => {
                connection.end();
                if (error) {
                    return reject(error);
                }
                return resolve({
                    token,
                    role: results[0].role
                })
            })
        })
    })
}

var logout = (auth) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = 'UPDATE users SET token = "" WHERE token = ?';
        connection.connect();
        // Xoa bo token cua tai khoan
        connection.query(query, [auth.token], (error, results, fileds) => {
            connection.end();
            if (error) {
                return reject(error);
            }
            return resolve();
        })
    })
}

module.exports = { login, logout };