var jwt = require('express-jwt');
var secret = require('../config').secret;

function getTokenFromHeader(req) {
    console.log("getTokenFromHeader -- called");
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
        console.log("Token found:");
        console.log(req.headers.authorization.split(' ')[1]);
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

var refreshAuth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeader
    })
};

module.exports = refreshAuth;