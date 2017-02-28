module.exports.controller = function (app){
    app.get("/Login", function(req,resp){
        resp.send("Login");
    });

    app.get("/Register", function(req,resp){
        resp.send("Test1");
    })
}