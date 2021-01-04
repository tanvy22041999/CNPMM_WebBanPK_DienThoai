const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.product = require("./product")(mongoose);
db.category=require("./categories")(mongoose);
db.user=require("./users")(mongoose);
db.order=require("./orders")(mongoose);
module.exports = db;
