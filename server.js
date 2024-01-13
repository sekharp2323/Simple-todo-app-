var express = require('express');
const cors=require('cors');
const routes=require('./routes')

var app = express();
app.use(express.json())
app.use(cors())
app.use('/',routes)

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})