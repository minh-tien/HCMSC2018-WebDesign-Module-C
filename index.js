'use strict';
const http = require('http');
const url = require('url');
const auth = require('./route/Authentication');
const airline = require('./route/Airline');
const checkValid = require('./checkValid');
const checkToken = require('./auth');

// Route dieu huong API
var route = {
    '/v1/auth/login': auth.login,
    '/v1/auth/logout': auth.logout,
    '/v1/airline': airline.createCompany,
    '/v1/flight': airline.createFlight
    //9/3/2018
}

// Khoi tao server
http.createServer(async (req, res) => {
    try {
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
            req.addListener('end', async () => {
                try {
                    // Goi toi route de xu ly
                    var cToken = undefined;
                    if (pathname !== '/v1/auth/login') {
                        cToken = await checkToken(req);
                    }
                    await route[pathname](req, res, data, cToken);
                } catch (error) {
                    if (error.message === 'auth') {
                        res.writeHead(401);
                        var result = { message: 'Unauthorized user' };
                        result = JSON.stringify(result);
                        res.write(result);
                    }
                } finally {
                    res.end();
                }
            })
        } else {
            // //Cac duong dan dong
            var cToken = await checkToken(req);
            var segments = pathname.trim().split('/');
            segments.shift();
            if (segments[0] === 'v1' && segments[1] === 'flight') {
                if (req.method === 'GET' && segments.length === 5) {
                    //2.c
                    await airline.getFlights(req, res, segments);
                } else if (req.method === 'PUT' && segments.length === 3) {
                    //2.e
                } else if (req.method === 'DELETE' && segments.length === 3) {
                    //2.f
                }
            } else {
                throw new Error('404');
            }
        }
    } catch (error) {
        if (error.message === 'auth') {
            res.writeHead(401);
            res.write(JSON.stringify({ message: 'Unauthorized user' }));
        } else if (error.message === '404') {
            // Neu duong dan API khong hop le
            res.writeHead(404);
            res.write(JSON.stringify({ message: '404' }));
        }
        res.end();
    }
}).listen(process.env.PORT || 80);