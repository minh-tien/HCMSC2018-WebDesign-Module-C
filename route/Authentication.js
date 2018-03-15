const checkValid = require('../checkValid');
const DBAuth = require('../database/Authentication');

// Xu ly dang nhap
var login = async (req, res, data, auth) => {
    try {
        // Kiem tra tinh hop le cua JSON do Client gui len
        // Trong truong hop nay chuoi JSON can 2 thuoc tinh 'username' va 'password'
        var data = checkValid.validJSON(data, ['username', 'password']);
        if (req.method === 'POST' && data) {
            var oDBAuth = new DBAuth();
            var resultDB = await oDBAuth.login(data);
            res.writeHead(200);
            var result = {
                token: resultDB.token,
                role: resultDB.role
            }
            result = JSON.stringify(result);
            res.write(result);
        } else {
            // Truong hop JSON gui len khong hop le
            throw new Error('error');
        }
    } catch (error) {
        res.writeHead(401);
        var result = { message: 'Invalid login' };
        result = JSON.stringify(result);
        res.write(result);
        throw error;
    }
}

// Xu ly dang xuat
var logout = async (req, res, data, auth) => {
    try {
        // Kiem tra hop le cua chuoi truy van do Client gui len
        // Trong truong hop nay chuoi truy van can 1 key 'token'
        var data = checkValid.validQuery(req.url, ['token']);
        if (req.method === 'GET' && data) {
            var oDBAuth = new DBAuth();
            await oDBAuth.logout(auth);
            res.writeHead(200);
            var result = { message: 'Logout success' };
            result = JSON.stringify(result);
            res.write(result);
        } else {
            // Truong hop chuoi truy van gui len khong hop le
            throw new Error('error');
        }
    } catch (error) {
        res.writeHead(401);
        var result = { message: 'Unauthorized user' };
        result = JSON.stringify(result);
        res.write(result);
        throw error;
    }
}

module.exports = { login, logout };