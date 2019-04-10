'use sztrict';
var path = require('path');
var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session'); // 세션정보는 메모리에 저장함
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();

router.use(session({
    secret: '@#@$MYS@@!IGN#@$#$',
    resave: false,
    saveUninitialized: true
}))

router.use((req, res, next) => {
    if (!req.session.views) {
        req.session.views = {}
    }
    // get the url pathname
    var pathname = parseurl(req).pathname;
    // count the views
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;

    next();
})


router.get('/foo', (req, res, next) => {
    res.send('you viewed this page ' + req.session.views['/foo'] + ' times');
})

router.get('/bar', (req, res, next) => {
    res.send('you viewed this page ' + req.session.views['/bar'] + ' times');
})

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/logout', (req, res) => {
    var sess;
    sess = req.session;
    if (sess.username) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/');
    }
});



router.post('/login', async (req, res, bodyParser) => {

    var idPass = "$2b$05$YKrQhVu5Hai5ml4sIUmoIue2jTYmgK2mQDRemS3NqeteJhYZRxpKq"; // hash("aaaa");
    var input_id = req.body.email;
    var input_pw = req.body.password;
    var sess;
    sess = req.session;

    const result = bcrypt.compareSync(input_pw, idPass);  // input pw if hash("aaaa");
       
    if (sess.username) {
        res.json({ 'result': sess.username + '님이 로그인 하셨습니다.2' });
        return false;
    } else {
        try {
            if (input_id == 'admin' && result == true) {
                sess.username = input_id;
                console.log(sess.username);
                res.json({ 'result': sess.username + '님이 로그인 하셨습니다1.' });
                return false;
            } else {
                res.json({ 'result': '로그인 하시길 바랍니다.' });
                return false;
            }
        } catch (error) {
            console.error(error);
            return next(error);
        }
    }
})

module.exports = router;

