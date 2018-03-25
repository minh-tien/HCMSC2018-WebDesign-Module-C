'use strict';
const DBAuth = require('../model/DBAuth');
const View = require('../view/View');

module.exports = class Auth {
    constructor(res, data) {
        this.res = res;
        this.data = data;
    }

    async login() {
        try {
            var { username, password } = this.data.POST;
            if (username instanceof Error || password instanceof Error) {
                throw new Error('401');
            }
            var oDBAuth = new DBAuth({ username, password });
            var res = await oDBAuth.login();
            var oView = new View(200, this.res, res);
            oView.exec();
        } catch (error) {
            var oView = new View(401, this.res, { message: 'Invalid Login' });
            oView.exec();
        }
    }

    async logout() {
        try {
            var { token } = this.data.GET;
            var oDBAuth = new DBAuth({ token });
            await oDBAuth.logout();
            var oView = new View(200, this.res, { message: 'Logout Success' });
            oView.exec();
        } catch (error) {
            throw new Error('Invalid Token');
        }
    }
}