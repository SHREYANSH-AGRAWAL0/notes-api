const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true,require:true },
    phone: { type: String, unique: true },
    password: { type: String },
    fullname: { type: String ,default:""}
})

module.exports = mongoose.model('User', userSchema); 