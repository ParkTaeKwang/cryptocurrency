
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'tkpark',
  password : '1234',
  database : 'tkpark'
});
conn.connect();

//app.set('views', './views_mysql');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(bodyParser.urlencoded({extended: false}));

app.get('/topic/new', function(req, res) {
  res.render('new');
});


app.post('/topic', function(req, res) {
  // 입력한 값 가져오기
  var title = req.body.title;
  var author = req.body.author;
  var description = req.body.description;

  // 쿼리 작성
  var sql = 'INSERT INTO topic (title, description, author) values (?, ?, ?)';
  var params = [title, description, author];

  // 쿼리 실행
  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.send('Success!');
    }
  });
});

app.get('/topic', function(req, res) {
  // 쿼리 작성 (id와 title 정보를 가져온다)
  var sql = 'SELECT id, title FROM topic';

  // 쿼리 실행
  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.render('view', {topics: rows}); // 가져온 정보를 jade 파일에 넘겨준다.
    }
  });
});



app.get('/topic/:id', function(req, res) {
  var id = req.params.id;
  var sql = 'SELECT * from topic where id=?'
  var params = [id];

  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.render('detail', {topic: rows[0]});
    }
  });
});


app.post('/topic/:id/edit', function(req, res) {
  // 전송된 정보 받아오기
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;

  // 쿼리 작성하기
  var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
  var params = [title, description, author, id];

  // 쿼리 실행하기
  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.send('수정되었습니다.');
    }
  });
});


app.post('/topic/:id/delete', function(req, res) {
  var id = req.params.id;

  var sql = 'DELETE from topic WHERE id=?';
  var params = [id];

  conn.query(sql, params, function(err, row, fields) {
    if(err)
      console.log(err);
    else {
      res.send('삭제되었습니다.');
    }
  })
});








module.exports = app;
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
