var User = require("../Model/User")

module.exports.controller = function (apiRouts){
    ///Register new user
    apiRouts.post("/signup", function(req,resp){
        if (!req.body.fullName && !req.body.password) {
            resp.json({ success: false, msg: 'Please pass name and password.' });
        } else {
            var newUser = new User({
                FullName: req.body.fullName,
                UserName: req.body.userName,
                Password: req.body.password
            });
            newUser.save(function(err){
                if(err){
                    resp.json({message: "Error Occured - "+ err});
                }
                resp.json({message: "User Created"});
            });
        }
    });
    
    ///Get all saved users
    apiRouts.get("/user", function (req, resp) {
        User.find({}, function (err, users) {
            if (err)
                throw err;
            resp.json(users);
        });
    });
    ///Get users by id
    apiRouts.get("/user/:user_name", function (req, resp) {
        if (req.params && req.params.user_name) {
            User.find({ UserName: req.params.user_name }, function (err, users) {
                if (err)
                    throw err;
                if (users && users.length > 0)
                    resp.json(users);
                else
                    resp.json({message: "No User to show"});
            });
        }
    });

}
