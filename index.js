'use strict';
const http = require('http');
const url = require('url');
const auth = require('./route/Authentication');

// Route dieu huong API
var route = {
    '/v1/auth/login': auth.login,
    '/v1/auth/logout': auth.logout
}

// Khoi tao server
http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    // Kiem tra duong dan API hop le
    if (typeof route[pathname] === 'function') {
        var data = '';
        req.setEncoding('utf8');
        res.setHeader('Content-Type', 'application/json');
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
        res.writeHead(404);
        var result = { message: '404' };
        result = JSON.stringify(result);
        res.write(result);
        res.end();
    }
}).listen(process.env.PORT || 80);