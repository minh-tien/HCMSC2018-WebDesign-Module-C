const crypto = require('crypto');
const checkValid = require('../checkValid');

// Xu ly dang nhap
var login = (req, res, data) => {
    // Kiem tra tinh hop le cua JSON do Client gui len
    // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'username' va 'password'
    var data = checkValid.validJSON(data, ['username', 'password']);
    if (req.method === 'POST' && data) {
        res.writeHead(200);
        // Ket qua tra ve co 'token' chua gia tri bam md5 cua 'username'
        var result = {
            token: crypto.createHash('md5').update(data.username).digest('hex'),
            role: 'USER'
        }
        result = JSON.stringify(result);
        res.write(result);
    } else {
        // Truong hop JSON gui len khong hop le
        res.writeHead(401);
        var result = { message: 'Invalid login' };
        result = JSON.stringify(result);
        res.write(result);
    }
}

// Xu ly dang xuat
var logout = (req, res, data) => {
    // Kiem tra hop le cua chuoi truy van do Client gui len
    // Trong truong hop nay chuoi truy van can 1 key 'token'
    var data = checkValid.validQuery(req.url, ['token']);
    if (req.method === 'GET' && data) {
        res.writeHead(200);
        var result = { message: 'Logout success' };
        result = JSON.stringify(result);
        res.write(result);
    } else {
        // Truong hop chuoi truy van gui len khong hop le
        res.writeHead(401);
        var result = { message: 'Unauthorized user' };
        result = JSON.stringify(result);
        res.write(result);
    }
}

module.exports = {
    login: login,
    logout: logout
}