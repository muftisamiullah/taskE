/*  middleware used by both user and admin routes checking whether 
api requests have token with dem or not */

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authUser(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied! No token provided'); //if token isnt provided
    try {
        const decoded = jwt.verify(token, process.env.jwtPrivateKey);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(400).send('Invalid token.') //if wrong token is passed
    }
}
module.exports = authUser;