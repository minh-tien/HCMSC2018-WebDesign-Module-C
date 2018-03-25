'use strict';

module.exports = class View {
    constructor(type, res, data) {
        this.type = type;
        this.res = res;
        this.data = data;
    }

    exec() {
        switch (this.type) {
            case 404:
                this.view404();
                break;
            case 401:
                this.view401();
                break;
            case 422:
                this.view422();
                break;
            case 200:
                this.view200();
                break;
        }
    }

    view404() {
        this.res.writeHead(404);
        this.res.write(JSON.stringify({ message: 'Not Found' }));
        this.res.end();
    }

    view401() {
        this.res.writeHead(401);
        this.res.write(JSON.stringify(this.data));
        this.res.end();
    }

    view422() {
        this.res.writeHead(422);
        this.res.write(JSON.stringify({ message: 'Data Cannot Be Process' }));
        this.res.end();
    }

    view200() {
        this.res.writeHead(200);
        this.res.write(JSON.stringify(this.data));
        this.res.end();
    }
}