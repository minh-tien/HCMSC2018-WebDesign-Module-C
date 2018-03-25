'use strict';
const mysql = require('mysql');
const config = require('./config.json');

module.exports = class DBConnect {
    constructor() {
        this.connection = mysql.createConnection(config);
        this.connection.connect();
    }
}