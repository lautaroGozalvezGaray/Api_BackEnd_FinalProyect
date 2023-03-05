const jwt = require('jsonwebtoken');

const PRIVATE_KEY = process.env.PRIVATE_KEY;

function generateToken(user){

    return jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '1h'});

}

module.exports = generateToken;