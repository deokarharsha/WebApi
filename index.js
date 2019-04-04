var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

//cors Middleware
app.use(cors());

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Atharv$123",
    database : "ticket"
});

/*Connecting to Database*/

connection.connect(function(error){
    if(error)
    {
    console.log("Problem with MySQL"+error);
    }
    else
    {
    console.log("Connected with Database");
    }
});

/*Start the Server*/
app.get('/',function(req,res){
    let origin = req.headers.origin;
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.sendfile('index.html');
    });
app.get('/users',function(req,res){
    connection.query("call doUsers()",function(err,rows){
        if(err)
        {
            console.log("Problem with MySQL"+err);
        }
        else
        {
            res.end(JSON.stringify(rows));
            console.log(res);
        }
    });
});

 app.post('/details', function(req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);
    let origin = req.headers.origin;
    console.log(origin)
    res.setHeader('Access-Control-Allow-Origin', origin);
    var sql = "INSERT INTO `details`(`email`, `password`) VALUES ('"+req.body.email+"','"+req.body.password+"')";
    connection.query(sql, function(err, result)  {
        if(err) {
            console.log("Problem with MySQL"+err);
        }else{
            res.end(JSON.stringify(result));
            console.log(result);
            console.log("table created");
        }
        });
});
 

app.listen(3000,function(){
    console.log("It's Started on PORT 3000");
});