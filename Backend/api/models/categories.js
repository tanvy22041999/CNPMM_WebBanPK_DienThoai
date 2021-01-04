const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    _id: mongoose.Schema.Types.ObjectId
});


module.exports = mongoose.model('Category',categoriesSchema);