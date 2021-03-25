const expressJwt = require('express-jwt');
const config = require('../config.json');
// const sellerService = require('../')

function jwt() {
    const secret = config.secret;
    return expressJwt({secret, algoriths: ['HS256'], })
}

