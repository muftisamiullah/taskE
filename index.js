const dotenv = require('dotenv');
// const { auth } = require('express-openid-connect');
const express = require('express');
const users = require('./routes/user-routes');

var app = express();

app.use(express.json());

app.use('/api/users', users);

dotenv.config();
var port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});