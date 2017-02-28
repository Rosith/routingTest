var fs = require("fs");

////Looping through all files in Controllers folder. get all routing infor from controllers
module.exports = function(express,app){
    ///web controller
    var controllerRouts = express.Router();
    fs.readdirSync("./Controllers").forEach(function(file){
        
        if(file.substr(-3) == '.js'){
            var route = require("../Controllers/"+file);
            if(route.controller){
                route.controller(controllerRouts);
            }
        }
    });
    var apiRouts = express.Router();
    fs.readdirSync("./Apis").forEach(function(file){
        
        if(file.substr(-3) == '.js'){
            var route = require("../Apis/"+file);
            if(route.controller){
                route.controller(apiRouts);
            }
        }
    });
    app.use('/', controllerRouts);
    app.use('/api', apiRouts);
}