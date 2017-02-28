var bcrypt = require("bcrypt");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
        bcrypt.genSalt(10, function(err, salt) {
            if(err){
                return next(err);
            }
            bcrypt.hash(newUser.Password, salt, function(err, hash) {
                if(err){
                    return next(err);
                }
                newUser.Password = hash;
            });
        });
    }
    next();
});

var User = mongoose.model("User",userSchema);
module.exports = User;