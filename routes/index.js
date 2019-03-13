
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'The Ethereum Block Explorer'
  });
});

router.get('/block/:number/', function (req, res, next) {
  var number = req.params['number'];
  res.render('../public/block.html', {
    title: 'Block',
    number: number
  });
});

router.get('/tx/:hash/', function (req, res, next) {
  var hash = req.params['hash'];
  res.render('../public/transaction.html', {
    title: 'Transaction',
    hash: hash
  });
});

router.get('/t1111x/:hash/', function (req, res, next) {
  var hash = req.params['hash'];
  res.render('transaction', {
    title: 'Transaction',
    hash: hash
  });
});

router.get('/address/:address/', function (req, res, next) {
  var address = req.params['address'];
  res.render('../public/address.html', {
    title: 'Address',
    address: address
  });
});

router.get('/watch', function (req, res, next) {
  res.render('watch', {
    title: 'Watch'
  });
});

router.post('/decoder', function (req, res, next) {
  // req.body.data
  res.json({});
});

module.exports = router;
/*
// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.router.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

*/
