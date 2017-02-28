module.exports.controller = function (app){
    app.get("/home", function(req,resp){
        resp.send(showhome());
    });

    app.get("/Test", function(req,resp){
        resp.send("Test2");
    })
}

var showhome = function(){
    return 'Wellcome to structured way test. Routes defined in controler'
}
