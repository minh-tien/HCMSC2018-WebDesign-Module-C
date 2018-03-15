const mysql = require('mysql');
const configs = require('../config.json');

const DBConnect = class DBConnect {
    constructor() {
        this.connection = mysql.createConnection(configs);
        this.connection.connect();
    }
}

module.exports = DBConnect;