const jwt = require('jsonwebtoken')

const generateAccessToken = (email) => {
    const payload = {
        email: email,
    };

    const secret = process.env.SECRETKEY;
    const options = { expiresIn: '1y' };

    return jwt.sign(payload, secret, options);
}

module.exports = generateAccessToken