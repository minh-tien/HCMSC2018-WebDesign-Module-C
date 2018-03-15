const mysql = require('mysql');
const crypto = require('crypto');
const DBConnect = require('./DBConnect');

const DBAuth = class DBAuth extends DBConnect {
    constructor() {
        super();
    }

    login(data) {
        return new Promise((resolve, reject) => {
            var query = 'SELECT * FROM users WHERE username = ? AND password = ?';
            // Kiem tra tai khoan co ton tai hay khong
            //console.log(crypto.createHash('md5').update(data.password).digest('hex'));
            //return true;
            this.connection.query(query, [data.username, data.password], (error, results, fileds) => {
                // Neu xay ra loi hoac tai khoan khong ton tai
                if (error || results.length === 0) {
                    this.connection.end();
                    return reject(error);
                }
                // 'token' chua gia tri bam md5 cua 'username' ket hop voi timestamp
                var token = crypto.createHash('md5').update(data.username + Date.now()).digest('hex');
                var query2 = 'UPDATE users SET token = ? WHERE username = ?';
                // Cap nhat token cho tai khoan
                this.connection.query(query2, [token, data.username], (error, results2, fileds) => {
                    this.connection.end();
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

    logout(auth) {
        return new Promise((resolve, reject) => {
            var query = 'UPDATE users SET token = "" WHERE token = ?';
            // Xoa bo token cua tai khoan
            this.connection.query(query, [auth.token], (error, results, fileds) => {
                this.connection.end();
                if (error) {
                    return reject(error);
                }
                return resolve();
            })
        })
    }
}

module.exports = DBAuth;