
const mongoose = require('mongoose');


const usersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    gender: {type: String, require: false},
    birthday: {type: Date, require: false},
    phone: {type:Number, require: false},
    isAdmin: { type: Boolean, required: true, default: false },
    isConfirm: {type: Boolean, require: true, default: false },
    isLock: {type: Boolean, require: true, default: false }
},
{timestamps: true});

module.exports = mongoose.model('User',usersSchema);