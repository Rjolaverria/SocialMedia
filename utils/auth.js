const { AuthenticationError } = require('apollo-server');
const config = require('config');

const jwt = require('jsonwebtoken');
const SECRET_KEY = config.get('JWTsecret');

module.exports = (context) => {
    // Authorization header
    const header = context.req.headers.authorization;
    if (!header) {
        throw new Error('Authorization header is required.');
    }

    // Auth Token
    const token = header.split(' ')[1];
    if (!token) {
        throw new Error("Missing Token. Format must be 'Bearer <token>.");
    }

    // Authenticate and return user
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new AuthenticationError('Token is not valid');
    }
};
