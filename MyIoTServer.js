const express = require('express')
const app = express()
const port = 8000;
const host = 'localhost';
const bodyParser = require('body-parser')

const mysql = require("mysql2");
let a;
let mySQL= require('./modules/moduleMySQL');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


app.use('/img', express.static(`${__dirname}/html/img`));
app.use('/', express.static(`${__dirname}/html`));

app.post('/api/iot/write', jsonParser, function (req, res) {
  console.log(req.body);
  console.log(req.body.clientID)
  res.sendStatus(200);
  //mySQL.write(req.body.clientID, req.body.date, req.body.value, req.body.measureType, 
             // req.body.voltage, req.body.gps, req.body.comment);
})
app.post('/api/client/read', jsonParser, function (request, response) {
  console.log("Get client request");
  mySQL.read()
    .then(res=>{
      //console.log(res)
      response.send(res[0]);
    })
    .catch(err=>{
      console.log(err)
      response.send(err);
    })


})
  
app.listen(port, host, 511, console.log(`Server is running on http://${host}:${port}`));