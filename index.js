var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

//cors Middleware
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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
    var sql = "select * from users";
    connection.query(sql,function(err,rows){
        if(err)
        {
            console.log("Problem with MySQL"+err);
        }
        else
        {
            res.send(JSON.stringify(rows));
        }
    });
});
app.post('/users', function(req, res, next) {
    var sql = "call doUsers('"+req.body.email+"','"+req.body.password+"')";
    connection.query(sql, function(err, result)  {
        let data = [];
        if(err){
            console.log("Problem with MySQL"+err);
        }else{
            if(result[0]){
                data = JSON.stringify(result[0]);
            }
            res.send(data);
        }
    });
});
app.post('/user', function(req, res, next) {
    var sql = "INSERT INTO `users` (name,email, password,isAdmin) VALUES ('"+req.body.name+"','"+req.body.email+"', MD5('"+req.body.password+"'),"+req.body.isAdmin+")";
    connection.query(sql, function(err, result)  {
        if(err){
            console.log("Problem with MySQL"+err);
        }else{
            res.send(JSON.stringify(result));
        }
    });
});
app.post('/user1', function(req, res, next) {
    console.log(req.body);
    var sql = "update `users` set name ='"+req.body.name+"', email = '"+req.body.email+"', password = MD5('"+req.body.password+"'), isAdmin = "+req.body.isAdmin+" where id = '"+req.body.id+"' ";
    console.log(sql);
    connection.query(sql, function(err, result)  {
        if(err){
            console.log("Problem with MySQL"+err);
        }else{
            res.send(JSON.stringify(result));
        }
    });
});


app.listen(3000,function(){
    console.log("It's Started on PORT 3000");
}); 








