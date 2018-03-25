'use strict';
const crypto = require('crypto');
const DBConnect = require('./DBConnect');

module.exports = class DBAuth extends DBConnect {
    constructor(param) {
        super();
        this.param = param;
    }

    login() {
        return new Promise((resolve, reject) => {
            var { username, password } = this.param;
            var query = 'SELECT * FROM users WHERE username = ? AND password = ?';
            this.connection.query(query, [username, password], (err, res) => {
                if (err || res.length === 0) {
                    this.connection.end();
                    return reject(err);
                }
                var token = crypto.createHash('md5').update(username + Date.now()).digest('hex');
                var query2 = 'UPDATE users SET token = ? WHERE username = ?';
                this.connection.query(query2, [token, username], (err2, res2) => {
                    this.connection.end();
                    if (err2) {
                        return reject(err2);
                    }
                    return resolve({
                        token,
                        role: res[0].role
                    })
                })
            })
        })
    }

    logout() {
        return new Promise((resolve, reject) => {
            var { token } = this.param;
            var query = 'UPDATE users SET token = "" WHERE token = ?';
            this.connection.query(query, [token], (err, res) => {
                this.connection.end();
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }
}