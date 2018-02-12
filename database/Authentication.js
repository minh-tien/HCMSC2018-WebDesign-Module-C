const mysql = require('mysql');
const crypto = require('crypto');
const config = require('../config.json');

var login = (data) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = `SELECT * FROM auth WHERE username = '${data.username}' AND password = '${data.password}'`;
        connection.connect();
        // Kiem tra tai khoan co ton tai hay khong
        connection.query(query, (error, results, fileds) => {
            // Neu xay ra loi hoac tai khoan khong ton tai
            if (error || results.length === 0) {
                connection.end();
                return reject(error);
            }
            // 'token' chua gia tri bam md5 cua 'username' ket hop voi timestamp
            var token = crypto.createHash('md5').update(data.username + Date.now()).digest('hex');
            var query2 = `UPDATE auth SET token = '${token}' WHERE username = '${data.username}'`;
            // Cap nhat token cho tai khoan
            connection.query(query2, (error, results2, fileds) => {
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

var logout = (data) => {
    return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(config);
        var query = `SELECT * FROM auth WHERE token = '${data}'`;
        connection.connect();
        // Kiem tra token co ton tai hay khong
        connection.query(query, (error, results, fileds) => {
            // Neu xay ra loi hoac token khong ton tai
            if (error || results.length === 0) {
                connection.end();
                return reject(error);
            }
            var query2 = `UPDATE auth SET token = '' WHERE username = '${results[0].username}'`;
            // Xoa bo token cua tai khoan
            connection.query(query2, (error, results, fileds) => {
                connection.end();
                if (error) {
                    return reject(error);
                }
                return resolve();
            })
        })
    })
}

module.exports = { login, logout };