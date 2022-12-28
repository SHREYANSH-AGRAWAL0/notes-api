const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userid: { type: String, unique: true, require: true },
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    password: { type: String },
    fullname: { type: String ,default:""}
})

module.exports = mongoose.model('User', userSchema); 