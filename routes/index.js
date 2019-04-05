'use strict';

var express = require('express');
var parseurl = require('parseurl')
var session = require('express-session'); // 세션정보는 메모리에 저장함
var bcrypt = require('bcrypt');
var router = express.Router();

var app = express();

router.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

router.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {}
    }
    // get the url pathname
    var pathname = parseurl(req).pathname
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

    next()
})


router.get('/foo', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

router.get('/bar', function (req, res, next) {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times')
})

router.get('/', (req, res) => {
    res.sendfile('public/login.html');
});

router.post('/login', async (req, res) => {

    res.sendfile('public/login.html');
    var idPass = "$2b$05$YKrQhVu5Hai5ml4sIUmoIue2jTYmgK2mQDRemS3NqeteJhYZRxpKq"; // hash("aaaa");
    var input_id = req.body['email'];
    var input_pw = req.body['password'];

    const result = bcrypt.compareSync(input_pw, idPass);  // input pw if hash("aaaa");

    try {
        if (input_id == 'admin' && result == true) {
            res.json({ 'result': 'true' });
        } else {
            res.json({ 'result': 'false' });
        }
    } catch (error) {
        console.error(error);
        return next(error);
    } 


})

module.exports = router;

