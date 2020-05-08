/*  middleware used by admin routes verifying whether the
request is from the admin or a normal user.. */


function isAdmin(req, res, next) {
    if (req.user.role != 'admin') return res.status(403).send('Access Denied! Token Mismatch');
    next();
}
module.exports = isAdmin;