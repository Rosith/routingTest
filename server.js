var express = require("express");
var app = express();
var bodyParser  =   require('body-parser');
var config = require("./Configurations/webconfig");
//var mongoose = require("mongoose");
////Conect to db
// mongoose.connect(config.database);
require("./Model/db");
app.use(bodyParser.urlencoded({extended:false}));
///Loads all available routings
require("./Configurations/route")(express,app);


///Starting server
app.listen(process.env.PORT || config.port,function(){
    console.log("Svasthiya is running at port: "+ config.port);
});

