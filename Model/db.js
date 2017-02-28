var config = require("../Configurations/webconfig");
var mongoose = require("mongoose");

mongoose.connect(config.database);

mongoose.connection.on('error',function (err) {  
  console.log('DB connwction error: ' + err);
}); 
mongoose.connection.on('connected', function () {  
  console.log('Db connwction open in - ' + config.database);
});
mongoose.connection.on('disconnected', function () {  
  console.log('DB disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('db connetion termination'); 
    process.exit(0); 
  }); 
}); 

