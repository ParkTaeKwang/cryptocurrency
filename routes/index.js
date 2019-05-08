'use sztrict';
var path = require('path');
var express = require('express');
var parseurl = require('parseurl');
var session = require('express-session'); // 세션정보는 메모리에 저장함
var bcrypt = require('bcrypt');
var router = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();

const conn = mysql.createConnection({
    host: '192.168.0.139',
    post: 3306,
    user: 'tkpark',    // dbUser
    password: '1234',   // dbPassword
    database: 'tkpark'  // dbDatabase
});


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


router.get('/logout', (req, res) => {
    if (req.session.username) {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');
            }
        })
    } else {
        res.redirect('/login');
    }
});

router.get('/', function (req, res) {
    res.send('Hello home page <br/><a href="/login">로그인</a><br/> <a href="/logout">로그아웃</a> ');;
});


router.get('/mnemonic/', function (req, res) {
    var Mnemonic = require('bitcore-mnemonic');

// 니모닉 코드 생성
var code = new Mnemonic(Mnemonic.Words.ENGLISH);
console.log(code.toString());

// 니모닉 코드에서 개인키 생성
var xPriKey = code.toHDPrivateKey();
console.log(xPriKey);

});



//회원가입
router.get('/memberJoin', (req, res) => {
    console.log('GET : /memberJoin 회원가입폼 요청');
    if (req.session.username) {
        console.log('현재 로그인 상태입니다.');
        res.redirect('/boardList');
    } else {
        res.render('memberJoin');
    }
});

// 회원 가입처리
router.post('/memberJoin', (req, res) => {
    console.log('POST : /memberJoin 회원가입처리 요청');
    if (req.session.username) {
        console.log('현재 로그인 상태입니다.');
        res.redirect('/boardList');
    } else {
        // 회원 가입 처리
        // 회원 가입 정보 받아오기
        const member_id = req.body.memberId;
        const member_pw = req.body.memberPw;
        const member_name = req.body.memberName;
        const mnemonic = req.body.mnemonic;


        const saltRounds = 10; // default 10
        const password = member_pw;

        let salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        // id 중복 확인
        conn.quer('SELECT email_address FROM crypto_wallet WHERE email_address=?'
            , [member_id], (err, rs) => {
                if (rs[0]) {
                    console.log('중복된 아이디');
                    res.redirect('/memberJoin');
                } else {
                    console.log('아이디가 중복되지 않습니다. 계속 진행');
                    // 회원 가입 처리
                    conn.query('INSERT INTO crypto_wallet(email_address, password, name, mnemonic) VALUES(?,?,?,?)'
                        , [member_id, hash, member_name, mnemonic], (err, rs) => {
                            if (err) {
                                console.log(err)
                                console.log('가입 실패!');
                                res.end();
                            } else {
                                console.log('가입 완료!');
                                res.redirect('/login');
                            }
                        });
                }
            });
    }
});

// 로그인 폼
router.get('/login', (req, res) => {
    console.log('GET : /login 폼 요청');
    // 로그인 되어 있지 않다면 ...?
    if (!req.session.username) {
        res.render('login');
    } else {
        // 로그인 되어 있다면 ...?
        console.log('현재 로그인 상태입니다.');
        res.redirect('/boardList');
    }
});


router.post('/login', async (req, res, bodyParser) => {

    //var idPass = "$2b$05$YKrQhVu5Hai5ml4sIUmoIue2jTYmgK2mQDRemS3NqeteJhYZRxpKq"; // hash("aaaa");
    var input_id = req.body.memberId;
    var input_pw = req.body.memberPw;


    conn.query('SELECT password FROM crypto_wallet WHERE email_address=?', [input_id], (err, rs) => {
        //console.log(rs[0].password);    

        const result = bcrypt.compareSync(input_pw, rs[0].password);  // input pw if hash("aaaa");
        if (result == true) {
            console.log('로그인 성공!');
            // session에 저장
            req.session.username = input_id;
            console.log('로그인 ID : ' + req.session.username);
            console.log('  ');
            console.log('  ');
            res.redirect('/boardList');                
        } else {
        console.log('로그인 실패!');
        console.log('  ');
        res.redirect('/login');
        }  
    })    
});


router.get('/boardList', (req, res) => {
    res.render('boardList', {
        text: 'This is boardList page',
        whoami: req.session.username
    });
});


module.exports = router;
