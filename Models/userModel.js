const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true
    },
    email: {
        type:String,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        },
    },
    password: {
        type:String,
        required:true
    },
    phone: {
        type     : Number,
        required : true,
        unique   : true,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    role: {
        type: String,
        default:"user",
        enum:["user","admin"]
        
    }
},
{timestamps: true});

module.exports = mongoose.model('User', userSchema);