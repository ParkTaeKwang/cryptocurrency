var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var bkfd2Password = require('pbkdf2-password');
var MySQLStore = require('express-mysql-session')(session);
var router = express.Router();
var hasher = bkfd2Password();
router.use(bodyParser.urlencoded( {
	extended:false
}));
router.use(session( {
	secret:'1234DSFs@adf1234!@#$asd',resave:false,saveUninitialized:true,store:new MySQLStore( {
		host:'localhost',
		user:'tkpark',
		password:'1234',
		database:'tkpark'
	})
}));
router.get('/count',function(req,res) {
	if(req.session.count) {
		req.session.count++;
	}
	else {
		req.session.count = 1;
	}
	res.send('count:'+req.session.count);
});
router.get('/auth/logout',function(req,res) {
	delete req.session.displayName;
	req.session.save(function () {
		res.redirect('/welcome');
	});
});
router.get('/welcome',function(req,res) {
	if(req.session.displayName) {
		res.send(` <h1>Hello,$ {
			req.session.displayName
		}
		</h1><a href="/auth/logout">logout</a>`);
	}
	else {
		res.send(` <h1>Welcome</h1><ul><li><a href="/auth/login">Login</a></li><li><a href="/auth/register">Register</a></li></ul>`);
	}
});
var users = [ {
	username:'egoing',password:'YGtPgY5CFTppQbZkzxAEmy1YDpytKt5RQ0EODPB4lrDE8Vza6GTLEncSuAnRdKBpf7IhB80/MWLUpb2cG9WJDtOUYdgyHOqNgnhl3Gkfieefbosqe67/FfWBKu4lh48OsZalG/EM8I0QmDrpN0dTsJMe+9JOdnaxM/MHM475tS8=',salt:'SaWnAN62dpdClvcVC9i7JiLOXAcjMo0oz/G5dGKoxvVBy1bT+SqI2MWkPkydfgWtqpymipRj8nFm3nbr0/g9BA==',displayName:'Egoing'
}
, {
	username:'sayul2',password:'764a9b771f8a6365cfb7e6144a765c47',salt:'!!!@#DF#!W',displayName:'SAYUL2'
}];
router.post('/auth/login',function(req,res) {
	var uname = req.body.username;
	var pwd = req.body.password;
	for (var i = 0;
	i < users.length;
	i++) {
		var user = users[i];
		if (uname === user.username) {
			return hasher( {
				password:pwd,salt:user.salt
			}
			,function (err,pass,salt,hash) {
				if (hash === user.password) {
					req.session.displayName = user.displayName;
					req.session.save(function () {
						res.redirect('/welcome');
					})
				}
				else {
					res.send('Who are you? <a href="/auth/login">login</a>');
				}
			});
		}
	}
});
router.get('/auth/login',function(req,res) {
	var output = ` <h1>Login</h1><form action="/auth/login" method="post"><p><input type="text" name="username" placeholder="username"></p><p><input type="password" name="password" placeholder="password"></p><p><input type="submit"></p></form>`;
	res.send(output);
});
router.post('/auth/register',function (req,res) {
	users.push( {
		username:req.body.username,password:req.body.password,displayName: req.body.displayName
	});
	req.session.displayName = req.body.displayName;
	req.session.save(function() {
		res.redirect('/welcome');
	});
});

router.get('/auth/register',function(req,res) {
	var output = `<h1>Register</h1><form action = "/auth/register" method="post"><p><input type="text" name="username" placeholder="username"></p><p><input type="text" name="password" placeholder="password"></p><p><input type="text" name="displayName" placeholder="displayName"></p><p><input type="submit"></p></form>`;
	res.send(output);
});


module.exports = router;
