'use strict';
const url = require('url');
const qs = require('querystring');

module.exports = class CheckData {
    constructor(url, role, data, segment) {
        this.url = url;
        this.role = role;
        this.data = data;
        this.segment = segment;
    }

    exec() {
        return {
            GET: this.checkGET(),
            POST: this.checkPOST(),
            SEG: this.checkSegment()
        }
    }

    checkGET() {
        var query = {};
        query = Object.assign(query, qs.parse(url.parse(this.url).query));
        return this.checkBasic(query, this.role.paramGET);
    }

    checkPOST() {
        try {
            var result = {};
            if (this.data.length !== 0) {
                result = JSON.parse(this.data);
            }
            return this.checkBasic(result, this.role.paramPOST);
        } catch (error) {
            return error;
        }
    }

    checkSegment() {
        return this.checkBasic(this.segment, this.role.paramSegment);
    }

    checkBasic(data, param) {
        if (Object.keys(data).length !== param.length) {
            return new Error('Invalid PropLength');
        }
        for (var i of param) {
            var path = i.split(':');
            if (!data.hasOwnProperty(path[0])) {
                return new Error('Invalid PropName');
            }
            var result = this.checkValid(data[path[0]].toString().trim(), path[1]);
            data[path[0]] = result;
        }
        return data;
    }

    checkValid(data, type) {
        switch (type) {
            case 'STRING':
                return this.checkString(data);
            case 'INT':
                return this.checkInt(data);
            case 'DATE':
                return this.checkDate(data);
        }
    }

    checkString(data) {
        if (data.length !== 0) {
            return data;
        }
        return new Error('Invalid String');
    }

    checkInt(data) {
        if (data.length !== 0 && !isNaN(data) && data == parseInt(data)) {
            return parseInt(data);
        }
        return new Error('Invalid Int');
    }

    checkDate(data) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(data)) {
            var result = new Date(data);
            if (result.toString() !== 'Invalid Date') {
                return result;
            }
        }
        return new Error('Invalid Date');
    }
}