var User = require("../Model/User")
var crypto = require("crypto-js");
var jwt = require("jsonwebtoken");
var configuration = require("../Configurations/webconfig");

var passwordCryptKey = 'FZWX';
var userMessage = { IsValid: true, Message: "Success", set: function (stat, msg) { this.IsValid = stat; this.Message = msg } };


module.exports.controller = function (apiRouts) {
    ///Register new user
    apiRouts.post("/signup", function (req, resp) {

        var passwordBasicChk = ValidatePassword(req.body.userName, req.body.password);

        if (!req.body.fullName && passwordBasicChk.IsValid) {
            resp.json({ success: false, msg: 'Please pass name and password.' });
        }
        else {
            var newUser = new User({
                FullName: req.body.fullName,
                UserName: req.body.userName,
                Password: req.body.password
            });
            newUser.save(function (err) {
                if (err) {
                    resp.json({ message: "Error Occured - " + err });
                }
                resp.json({ message: "User Created" });
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
                    resp.json({ message: "No User to show" });
            });
        }
    });

    ///Login
    apiRouts.post("/Login", function (req, resp) {

        var passwordBasicChk = ValidatePassword(req.body.userName, req.body.password);
        if (passwordBasicChk.IsValid) {
            User.findOne({ UserName: req.body.userName }, function (err, users) {
                if (err)
                    throw err;
                if (!users) {
                    resp.json({ Scuccess: false, Message: "Invalide User name or password" });
                }

                var bytes = crypto.AES.decrypt(users.Password, passwordCryptKey);
                if (bytes.toString(crypto.enc.Utf8) != req.body.password) {
                    resp.json({ Scuccess: false, Message: "Invalide User name or password" });
                } 
                else {
                    var token = jwt.sign({ UserName: users.UserName, FullName: users.FullName }, configuration.secretKey, {
                        expiresIn: 1000
                    });
                    resp.json({ Scuccess: true, Message: "Success", token: token });
                }

            });
        }

    });
    var passwordMinLength = 8;
    var ValidatePassword = function (userName, password) {
        var userChek = { IsValid: true, Message: "Success", set: function (stat, msg) { this.IsValid = stat; this.Message = msg } };
        //Check credentials 
        if (!userName || !password) {
            userChek.set(false, "User name and password required");
        }

        //Check password length
        if (password.length < passwordMinLength) {
            userChek.set(false, "Password must have atleast " + passwordMinLength + " digit!");
        }
        return userChek;
    }
}
