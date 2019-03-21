var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'tkpark',
  password : '1234',
  database : 'tkpark'
});

var sql = 'INSERT INTO topic (title, description, author) VALUES (?, ?, ?)';
var params = ['MOVE', '묘한 분위기에 취해 너를 놔버려도 돼', '태민'];
conn.query(sql, params, function(err, rows, fields) {
  if(err)
    console.log(err)
  else {
    console.log(rows);
  }
})







