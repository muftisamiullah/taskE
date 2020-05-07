const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const Model = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const isUser = require('../middlewares/isUser');
var app = express();

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route to register a admin in the DB - module - 1
router.post('/register-admin', async(req, res) => {
    let user = await Model.User.count({ where: { email: req.body.email } });
    if (user) {
        return res.status(400).send('Admin with the same email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    return Model.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPass,
        role: 'admin'
    }).then(function(user) {
        if (user) {
            const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.jwtPrivateKey);
            return res.header('x-auth-header', token).send(user);
        } else {
            return res.status(400).send('Error in insert new record');
        }
    });
});

//route to register a new user in the DB - module 1
router.post('/register-user', async(req, res) => {
    let user = await Model.User.count({ where: { email: req.body.email } });
    if (user) {
        return res.status(400).send('User with the same email already registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    return Model.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashPass,
        role: 'user',
    }).then(function(user) {
        if (user) {
            // const token = jwt.sign({ id: user.id, is_approved: user.role, email: user.email }, process.env.jwtPrivateKey);
            // return res.header('x-auth-header', token).send(user);
            return res.send(user);
        } else {
            return res.status(400).send('Error in insert new record');
        }
    });
});

//route to login for user - module 2
router.post('/login', async(req, res) => {
    let user = await Model.User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.send("Invalid email or password");

    if (user.is_approved == null) return res.send("Account has not yet been Approved by the Admin"); //in case user has not been approved yet
    if (user.is_approved == false) return res.send("Account has been rejected by the Admin"); //in case user is rejected

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.jwtPrivateKey);
    return res.send(token);
});

//get the list of all new registered users whose status has not been changed to apporved or rejected
router.get('/getnewusers', [auth, isAdmin], async(req, res) => {
    let users = await Model.User.findAll({ where: { is_approved: null, role: 'user' } });
    res.send(users);
});

//check the approval status of a particular user
router.get('/:id/approval-status', [auth, isAdmin], async(req, res) => {
    let user = await Model.User.findOne({
        where: {
            role: 'user',
            id: req.params.id
        },
        attributes: ['id', 'is_approved']
    });
    res.send(user);
});

//single api to change the approval status of the user - module 2
router.put('/:id/change-approvalstatus', [auth, isAdmin], async(req, res) => {
    let user = await Model.User.findOne({ where: { id: req.params.id, role: 'user' } })
    if (!user) return res.status(404).send('User Not Found'); //if the user is not found in the DB or the specified id belongs to the admin

    if (user.is_approved == null || user.is_approved == 0) {
        Model.User.update({
                is_approved: 1
            }, {
                where: {
                    id: req.params.id //no need to check role here
                }
            }).then(result => res.status(200).send(result + ' User has been Approved'))
            .catch(err => res.status(500).send(err + ' Something went wrong'));
    } else {
        Model.User.update({
                is_approved: 0
            }, {
                where: {
                    id: req.params.id //no need to check role here
                }
            }).then(result => res.status(200).send(result + ' User has been Rejected'))
            .catch(err => res.status(500).send(err + ' Something went wrong'));
    }
});

//Retrive user information - module 3
router.get('/:id', [auth, isUser], async(req, res) => {
    let user = await Model.User.findOne({
        where: {
            role: 'user',
            id: req.params.id
        },
        attributes: ['firstname', 'lastname', 'email'] //showing only few attributes to the user
    });
    if (!user) return res.status(404).send('User Not Found'); //if user is not found in the DB 
    res.send(user); //returns the user that matches the specified id
});

//Edit user information - module 3
router.put('/:id', [auth, isUser], async(req, res) => {
    let user = await Model.User.findOne({
        where: {
            role: 'user',
            id: req.params.id
        },
    });
    if (!user) return res.status(404).send('User Not Found'); //check if a user is present or not
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    Model.User.update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashPass,
        }, {
            where: {
                id: req.params.id //no need to check role here
            }
        }).then(result => res.status(200).send(result + ' Record Updated Successfully'))
        .catch(err => res.status(500).send(err + ' Something went wrong'));
});

//test api
router.get('/test', (req, res) => {
    res.send('Hello World');
});

module.exports = router;