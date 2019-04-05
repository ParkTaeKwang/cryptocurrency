'use strict';

var request = require('request');
var express = require('express');
var router = express.Router();
var session = require('express-session');
var cookie = require('cookie-parser'); 
const app = express()

const bcrypt = require('bcrypt');


// render -> login
router.get('/', (req, res) => {
    /*
    var session = require('express-session');

    app.use(session({
        secret: '@#@$MYSIGN#@$#$',
        resave: false,
        saveUninitialized: true
    }));

    var sess = req.session;
    console.log(sess.secret);
    */
    res.sendfile('public/login.html');
});

// API -> login
router.post('/login', async (req, res) => {
    /*
    if (req.session.user) {
        res.sendfile('public/main.html');
    }
    else {
    */
    var idPass = "$2b$05$YKrQhVu5Hai5ml4sIUmoIue2jTYmgK2mQDRemS3NqeteJhYZRxpKq"; // hash("aaaa");
    var input_id = req.body['email'];
    var input_pw = req.body['password'];

    const result = bcrypt.compareSync(input_pw, idPass);  // input pw if hash("aaaa");

    try {
        if (input_id == 'admin' && result == true) {    
            req.session.email = {
                
                email: email
            };
            res.json({ 'result': req.session.email });
            } else {
                res.json({ 'result': 'false' });
            }
    } catch (error) {
           console.error(error);
           return next(error);
     } 

});

module.exports = router;
