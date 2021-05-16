const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
    "fullName": String,
    "email": String,
    "password": String
}));