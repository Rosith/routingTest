var crypto = require("crypto-js");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passwordCryptKey = 'FZWX';

var userSchema = new Schema({
    FullName   :   {type: String, require: true},
    IsAdmin     :   Boolean,
    UserName    :   {type: String, require: true, unique: true},
    Password    :   {type: String, require: true},
    CreatedDate :   Date,
    UpdatedDate :   Date
});

userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    this.updated_at = currentDate;
    var newUser = this;

    if(!this.IsAdmin){
        this.IsAdmin = false;
    }

    if (!this.CreatedDate){
        this.CreatedDate = currentDate;
    }

    if(this.isModified("Password")|| this.isNew){
        var cryptedPass = crypto.AES.encrypt(newUser.Password,passwordCryptKey);
        if(cryptedPass){
            newUser.Password = cryptedPass;
        }
    }
    next();
});

var User = mongoose.model("User",userSchema);
module.exports = User;
