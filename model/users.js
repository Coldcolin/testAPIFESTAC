const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    },
    DOB:{
        type: String,
        required: true,
    },
    Sex:{
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        required: true
    }
    
}, {timestamps: true});

const userModel = mongoose.model('festacUsers', userSchema);

module.exports = userModel;