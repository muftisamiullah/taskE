const UserModel = require('./user.js');
const connection = require('../dbconfig.js');

var User = connection.define('users', UserModel.attributes, UserModel.options)
User.sync({
    // force: true will drop the table if it already exists
    force: false,
    // force: true,
    match: /_servernew$/
}).then(function() {
    // Table created
    // return User.create();
    // return "user"
});

// you can define relationships here
module.exports.User = User;