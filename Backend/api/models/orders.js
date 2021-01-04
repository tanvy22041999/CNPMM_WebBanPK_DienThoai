
const mongoose = require('mongoose');


const ordersSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerName: { type: String, require: false, unique: false },
    customerPhone: { type: String, required: false },
    customerAddress: { type: String, require: false },
    totalPrices: { type: Number, require: false },
    status: { type: Boolean, default: false },
    note: { type: String, required: false },
    productlist: { type: Array, require: false },
},
{timestamps: true});

module.exports = mongoose.model('Orders',ordersSchema);