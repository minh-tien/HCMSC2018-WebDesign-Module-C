'use strict'
const http = require('http');
const url = require('url');
const Routes = require('./routes/Routes');
const CheckData = require('./middleware/CheckData');
const CheckToken = require('./middleware/CheckToken');
const View = require('./view/View');

const Index = class Index extends Routes {
    constructor() {
        super();
    }

    createServer() {
        http.createServer((req, res) => {
            var pathname = url.parse(req.url).pathname;
            var data = '';
            req.setEncoding('utf8');
            res.setHeader('Content-Type', 'application/json');
            req.addListener('data', (chunk) => {
                data += chunk;
            })
            req.addListener('end', async () => {
                try {
                    var resRoutes = this.checkRoutes(pathname, req.method);
                    var { route, segment } = resRoutes;
                    if (route instanceof Error) {
                        throw new Error('404');
                    }
                    var oCheckData = new CheckData(req.url, this.routes[route], data, segment);
                    var resultCheck = oCheckData.exec();
                    if (resultCheck.GET instanceof Error || resultCheck.POST instanceof Error || resultCheck.SEG instanceof Error) {
                        throw new Error('404');
                    }
                    if (this.routes[route].auth.length > 0) {
                        var oCheckToken = new CheckToken(this.routes[route].auth, resultCheck.GET.token);
                        await oCheckToken.exec();
                    }
                    var Controller = this.routes[route].controller;
                    var oController = new Controller[0](res, resultCheck);
                    oController[Controller[1]]();
                } catch (error) {
                    switch (error.message) {
                        case 'Invalid Token':
                            var oView = new View(401, res, { message: 'Unauthorized User' });
                            oView.exec();
                            break;
                        case '404':
                            var oView = new View(404, res, null);
                            oView.exec();
                            break;
                    }
                }
            })
        }).listen(process.env.PORT || 80);
    }

    checkRoutes(pathname, method) {
        var segment = {};
        var arrPathName = pathname.split('/');
        for (var route in this.routes) {
            var arrRoutes = route.split('/');
            if (arrPathName.length === arrRoutes.length && this.routes[route].method === method) {
                for (var i = 1; i < arrRoutes.length; i++) {
                    if (/^{[a-zA-Z]+}$/.test(arrRoutes[i])) {
                        var prop = arrRoutes[i].replace('{', '').replace('}', '');
                        segment[prop] = arrPathName[i];
                    } else if (arrRoutes[i] !== arrPathName[i]) {
                        break;
                    }
                    if (i === arrRoutes.length - 1) {
                        return { route, segment };
                    }
                }
            }
        }
        return new Error('404');
    }
}

var oIndex = new Index();
oIndex.createServer();