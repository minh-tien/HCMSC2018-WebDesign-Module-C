'use strict';
var http = require('http');
var url = require('url');
var qs = require('querystring');
var crypto = require('crypto');

// Kiem tra tinh hop le chuoi truy van GET
var validQuery = (data, property) => {
    var result = qs.parse(url.parse(data).query);
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


// Xu ly dang nhap
var login = (req, res, data) => {
    // Kiem tra tinh hop le cua JSON do Client gui len
    // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'username' va 'password'
    var data = validJSON(data, ['username', 'password']);
    if (req.method === 'POST' && data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        // Ket qua tra ve co 'token' chua gia tri bam md5 cua 'username'
        var result = {
            token: crypto.createHash('md5').update(data.username).digest('hex'),
            role: 'USER'
        }
        result = JSON.stringify(result);
        res.write(result);
    } else {
        // Truong hop JSON gui len khong hop le
        res.writeHead(401, { 'Content-Type': 'application/json' });
        var result = { message: 'Invalid login' };
        result = JSON.stringify(result);
        res.write(result);
    }
}

// Xu ly dang xuat
var logout = (req, res, data) => {
    // Kiem tra hop le cua chuoi truy van do Client gui len
    // Trong truong hop nay chuoi truy van can 1 key 'token'
    var data = validQuery(req.url, ['token']);
    if (req.method === 'GET' && data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var result = { message: 'Logout success' };
        result = JSON.stringify(result);
        res.write(result);
    } else {
        // Truong hop chuoi truy van gui len khong hop le
        res.writeHead(401, { 'Content-Type': 'application/json' });
        var result = { message: 'Unauthorized user' };
        result = JSON.stringify(result);
        res.write(result);
    }
}

// Route dieu huong API
var route = {
    '/v1/auth/login': login,
    '/v1/auth/logout': logout
}

// Khoi tao server
http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    // Kiem tra duong dan API hop le
    if (typeof route[pathname] === 'function') {
        var data = '';
        req.setEncoding('utf8');
        // Lay du lieu JSON POST tu Client
        req.addListener('data', (chunk) => {
            data += chunk;
        })
        req.addListener('end', () => {
            // Goi toi route de xu ly
            route[pathname](req, res, data);
            res.end();
        })
    } else {
        // Neu duong dan API khong hop le
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.write('Page not found');
        res.end();
    }
}).listen(80);