const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/product");

exports.findAll = (req, res, next) => {
    Product.find()
      //.select("name price _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              image: doc.images,
              quantity : doc.quantity,
              des: doc.des,
              categoryId: doc.categoryId,
              request: {
                type: "GET",
                url: "http://localhost:2000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};


exports.create = async (req, res, next) => {
const product = new Product({
  _id: new mongoose.Types.ObjectId(),
  name: req.body.name,
  price: req.body.price,
  quantity: req.body.quantity,
  des : req.body.des,
  //image:req.body.images,
  categoryId: req.body.categoryId,
  images : req.file.path || ""
});
product
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Created product successfully",
      createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          quantity:result.quantity,
          des:result.des,
          image: result.images,
          categoryId: result.categoryId,
          request: {
              type: 'GET',
              url: "http://localhost:2000/products/" + result._id
          }
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
};
exports.findOne =(req,res,next) => {
     const id = req.params.productId;
    Product.findById(id)
      //.select('name price _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:2000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};

exports.findProductbyCategory = (req, res , next )=>{
  const idcate = req.params.categoriesId;
  console.log(idcate)
    Product.find({categoryId : idcate})
      //.select('name price _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:2000/products'
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
};


exports.remove = (req, res, next) => {
const id = req.params.productId;
    Product.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:2000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};
exports.DeletebyIDcate = (idcate)=> {
  try{
  Product.remove({categoryId:idcate})
  .exec()
  }
  catch{
    return " canot delete product";
  }
};

exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.productId, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.productId
                });
            }
            res.send({
                success: true,
                data: data
            });
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "User not found with id " + req.params.productId
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating user with id " + req.params.productId
        });
    });
  };

// app.put('/api/stuff/:id', (req, res, next) => {
//   const thing = new Thing({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });
//   Thing.updateOne({_id: req.params.id}, thing).then(
//     () => {
//       res.status(201).json({
//         message: 'Thing updated successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });