const express = require("express");
const mongoose = require("mongoose");

const Order = require("../models/orders");


exports.findAll = (req, res, next)=>{
    Order.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        order: docs.map(doc => {
          return {
            _id: doc._id,
            customerName: doc.customerName,
            customerPhone: doc.customerPhone,
            customerAddress: doc.customerAddress,
            totalPrices: doc.totalPrices,
            status: doc.status,
            note: doc.note,
            productlist: doc.productlist,
            request: {
              type: "GET",
              url: "http://localhost:2000/orders/" + doc._id
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
exports.create=(req, res, next)=>{
    const order = new Order({
       _id: new mongoose.Types.ObjectId(), 
        customerName: req.body.customerName,
        customerPhone: req.body.customerPhone,
        customerAddress: req.body.customerAddress,
        totalPrices: req.body.totalPrices ,
        status: req.body.status ,
        note: req.body.note ,
        productlist: req.body.productlist ,

     });
     order
       .save()
       .then(result => {
         console.log(result);
         res.status(201).json({
           message: "Created order successfully",
           createdCategory: {
                _id: result._id,
                customerName: result.customerName,
                customerPhone: result.customerPhone,
                customerAddress: result.customerAddress,
                totalPrices: result.totalPrices,
                status: result.status,
                note: result.note,
                productlist: result.productlist,
               request: {
                   type: 'GET',
                   url: "http://localhost:2000/orders/" + result._id
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
 exports.delete = (req, res, next)=>{
    const id = req.params.orderId;
    Order.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:2000/orders',
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
exports.update = (req, res, next) => {

    Order.findByIdAndUpdate(req.params.orderId, {
          $set: req.body
      }, {new: true})
          .then(data => {
              if(!data) {
                  return res.status(404).send({
                      success: false,
                      message: "User not found with id " + req.params.orderId
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
                  message: "User not found with id " + req.params.orderId
              });
          }
          return res.status(500).send({
              success: false,
              message: "Error updating user with id " + req.params.orderId
          });
      });
    };
    exports.findOne = (req, res, next)=>{
        const id = req.params.orderId;
        console.log(id);
        Order.findById(id)
          //.select('name price _id')
          .exec()
          .then(doc => {
            console.log("From database", doc);
            if (doc) {
              res.status(200).json({
                  order: doc,
                  request: {
                      type: 'GET',
                      url: 'http://localhost:2000/orders'
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