mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'cap2bowoo',
    password: 'Cap2bowoo!',
    database: 'mydust'
})
connection.connect();

r={};
r.pm2_5=12.0;
r.pm10=15.0;

var query = connection.query('insert into dusts set ?', r, function(err, rows, cols) {
  if (err) throw err;
  console.log("done");
  process.exit();
});
