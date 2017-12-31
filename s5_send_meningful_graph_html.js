/*
 * 2017/12/19 Kyuho Kim
 * 2017/12/28 modified by Bowoo Jang
 * GET으로 호출하는 경우.
 * http://localhost:8082/graph
 */
var express = require('express')
var app = express()
fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'cap2bowoo',
    password: 'Cap2bowoo!',
    database: 'mydust'
})
connection.connect();



app.get('/graph', function (req, res) {
    console.log('got app.get(graph)');
    var html = fs.readFile('./graph.html', function (err, html) {
    html = " "+ html
    console.log('read file');

    var qstr = 'select * from dusts ';
    connection.query(qstr, function(err, rows, cols) {
      if (err) throw err;

      var data = "";
      var comma = "";
      for (var i=0; i< rows.length; i++) {
         r = rows[i];
         data += comma + "[ new Date('"+ r.time + "'),"+ r.pm2_5 + "," + r.pm10 + "]";
         comma = ",";
      }
      var header = "data.addColumn('datetime', 'Time');"
      header += "data.addColumn('number', 'pm2.5');"
      header += "data.addColumn('number', 'pm10');"
      html = html.replace("<%HEADER%>", header);
      html = html.replace("<%DATA%>", data);

      res.writeHeader(200, {"Content-Type": "text/html"});
      res.write(html);
      res.end();
    });
  });
})

var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('listening at http://%s:%s', host, port)
});
