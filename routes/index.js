'use strict';

var request = require('request');
var express = require('express');
var router = express.Router();
var session = require('express-session');

const bcrypt = require('bcrypt');


// render -> login
router.get('/', (req, res) => {
    res.sendfile('public/login.html');
});

router.get('/hash', (req, res) => {
const password = "aaaa";
const wrongPass = "aaaaa";

// 디비에 저장되야 할 정보
//const salt = "soulSP9v7WXozfzY9VHpuafuhjk2TBCJ1LHVqdJ73wStU";
const hash = bcrypt.hashSync("aaaa", 5);
       

// 사용자가 입력한 패스워드
const result1 = bcrypt.compareSync(password, hash);
const result2 = bcrypt.compareSync(wrongPass, hash);


console.log("hash", hash);
console.log("password ", result1);
console.log("wrongPass ", result2);
});

// API -> login
router.post('/login', async (req, res) => {
    /*
    if (req.session.user) {
        res.sendfile('public/main.html');
    }
    else {
    */

    var input_id = req.body['email'];
    var input_pw = req.body['password'];
    try {
        const hash = await bcrypt.hash(input_pw, 12);
        console.log(hash);
                                    
        if (input_id == 'admin' && input_pw == '1234') {
            
                res.json({ 'result': 'true' });
            } else {
                res.json({ 'result': 'false' });
            }
    } catch (error) {
           console.error(error);
           return next(error);
     } 

});


module.exports = router;

