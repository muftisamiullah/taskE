/*  middleware used by user routes verifying whether the
request is from the admin or a normal user.. */


function isUser(req, res, next) {
    if (req.user.role != 'user') return res.status(403).send('Access Denied! Token Mismatch');
    next();
}
module.exports = isUser;