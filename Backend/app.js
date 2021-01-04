  
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");





mongoose.connect('mongodb://localhost:27017/CNPMM',{
    useMongoClient: true
  });
  mongoose.Promise=global.Promise;

const productRoutes = require('./api/routes/products.route');
const orderRoutes = require('./api/routes/orders.route');
const categoryRoutes = require('./api/routes/categories.route');
const userRoutes = require('./api/routes/users.route');


app.use(morgan("dev"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  // IE9 doesn't set headers for cross-domain ajax requests
  if(typeof(req.headers['content-type']) === 'undefined'){
      req.headers['content-type'] = "application/json; charset=UTF-8";
  }
  next();
})
.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });




app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/categories', categoryRoutes);
app.use('/users',userRoutes);

app.use(express.static('./dist'));
app.get('/', (req, res) => {
  res.sendFile('index.html');
})

app.use('/upload', express.static('upload'));

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;

