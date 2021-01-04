const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null,'./upload' );
  },
  filename: (req, file, callback) => {
      callback(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({storage: storage});


const productroutes = require("../controllers/product.controllers");

router.get('/', productroutes.findAll);
router.get("/categories/:categoriesId", productroutes.findProductbyCategory);

router.put('/:productId',upload.single('image'),productroutes.update);
router.post('/' ,upload.single('image'), productroutes.create);  
router.get("/:productId", productroutes.findOne);
router.delete("/:productId", productroutes.remove);

  
  module.exports = router;
  