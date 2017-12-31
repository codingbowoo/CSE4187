/*
 * 2017/12/20 Kyuho Kim
 * 2017/12/28 Bowoo Jang modified
 * GET으로 호출하는 경우.
 * http://localhost:8080/log?pm2_5=11&pm10=15
 * http://localhost:8080/log?device=202&unit=3&type=T&value=24.2&seq=34
*/

var express = require('express');
var app = express();

mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'cap2bowoo',
    password: 'Cap2bowoo!',
    database: 'mydust'
})
connection.connect();

function insert_dusts(pm2_5, pm10) {
  obj = {};
  obj.pm2_5 = pm2_5;
  obj.pm10 = pm10;

  var query = connection.query('insert into dusts set ?', obj, function(err, rows, cols) {
    if (err) throw err;
    console.log("database insertion ok= %j", obj);
  });
}

app.get('/', function(req, res) {
  res.end('Nice to meet you');
});

app.get('/log', function(req, res) {
  r = req.query;
  console.log("GET %j", r);

  insert_dusts(r.pm2_5, r.pm10);
  // insert_dusts(r.device, r.unit, r.type, r.value, r.seq, req.connection.remoteAddress);
  res.end('OK:' + JSON.stringify(req.query));
});

var server = app.listen(8080, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
