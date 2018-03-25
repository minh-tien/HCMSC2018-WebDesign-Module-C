'use strict';
const mysql = require('mysql');
const DBConnect = require('../model/DBConnect');

module.exports = class CheckToken extends DBConnect {
    constructor(role, token = 'none') {
        super();
        this.role = role;
        this.token = (token instanceof Error) ? 'none' : token;
    }

    exec() {
        return new Promise((resolve, reject) => {
            var query = 'SELECT * FROM users WHERE token = ?';
            this.connection.query(query, [this.token], (err, res) => {
                this.connection.end();
                if (err || res.length === 0 || this.role.indexOf(res[0].role) === -1) {
                    return reject(new Error('Invalid Token'));
                }
                return resolve();
            })
        })
    }
}