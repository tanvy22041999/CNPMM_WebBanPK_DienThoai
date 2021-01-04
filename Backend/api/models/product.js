
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true, unique: true},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    des: {type: String, require: false}, 
    images: {type: String, require: false},
    categoryId: {type: String, required: false} 
    
});

module.exports = mongoose.model('Product', productSchema);
  