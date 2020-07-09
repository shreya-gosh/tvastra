/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err){
    console.log("error occured"+err);
    throw err;
  } 
  console.log("Database created!");
  db.close();
});*/


var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/tvastra';
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true); 
mongoose.set('useUnifiedTopology', true); 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('connected' , function(){
    console.log('Mongoose default connection done');
});

db.on('error', function(err){
    console.log('Error connecting' + err);
});

const User = require("./model");

module.exports= db;