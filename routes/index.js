'use strict';

var request = require('request');
var express = require('express');
var router = express.Router();

// render -> login
router.get('/', (req, res) => {
    res.sendfile('/public/index.html');
});


// API -> login
router.post('/login', (req, res) => {

    var input_id = req.body['f_address'];
    var input_pw = req.body['t_address'];

    console.log('input_id -> ', input_id);
    console.log('input_pw -> ', input_pw);

    if (input_id == 'admin' && input_pw == '1234') {
        res.json({ 'result': 'true' });
    } else {
        res.json({ 'result': 'false' });
    }
});


module.exports = router;
