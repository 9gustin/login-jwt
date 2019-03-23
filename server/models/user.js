var mongoose = require('mongoose');

var {Schema} = mongoose;

var UserSchema = new Schema({
    _id : mongoose.Types.ObjectId,
    username : String,
    email : String,
    created_at : Date,
    password : String,
    bio : String
});

module.exports = mongoose.model('User', UserSchema);
