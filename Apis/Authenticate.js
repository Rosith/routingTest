var User = require("../Model/User")

module.exports.controller = function (apiRouts){
    apiRouts.post("/signup", function(req,resp){
        if (!req.body.name || !req.body.password) {
            resp.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
                FullName: req.body.fullName,
                UserName: req.body.userName,
                Password: req.body.password
            });
        }
    });

}