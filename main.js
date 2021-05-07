const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodedb'
  
});
connection.connect();
app.set('view engine' , 'ejs');

app.use('/assets', express.static('assets'));
app.use('/images', express.static(__dirname + '/images'));
app.get('/home/donate' , function(req, res){
    res.render('donate');
});
app.get('/home' , function(req , res){
    res.render('main');
});
app.post('/home/donate', urlencodedParser, function (req, res) {
    //console.log(req.body);
    connection.query("INSERT INTO `donaters` (Name,Email,Amount,Message,Checkbox) VALUES ('"+req.body.name+"','"+req.body.email+"','"+req.body.amount+"','"+req.body.message+"','"+req.body.checkbox+"')", function(err, result){
        if(err) throw err;
            //console.log(result);
        });
        //res.end();
  });
  app.post('/home/' , urlencodedParser, function (req, res) {
    //console.log(req.body);
    connection.query("INSERT INTO `newsletter` (Email) VALUE ('"+req.body.email+"')", function(err, result){
        if(err) throw err;
            //console.log(result);
        });
  });
const server = app.listen(3000 , ()=>{
    console.log('Server is listening');
});