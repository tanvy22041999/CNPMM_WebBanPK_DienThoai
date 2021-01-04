const express = require("express");

const mongoose = require("mongoose");


const Category = require("../models/categories");
const product = require("./product.controllers");


exports.findAll = (req, res, next)=>{
    Category.find()
    //.select("name price _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        category: docs.map(doc => {
          return {
            name: doc.name,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:2000/categories/" + doc._id
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
exports.findOne = (req, res, next)=>{
    const id = req.params.categoriesId;
    console.log(id);
    Category.findById(id)
      //.select('name price _id')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              cate: doc,
              request: {
                  type: 'GET',
                  url: 'http://localhost:2000/categories'
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
exports.create=(req, res, next)=>{
   const category = new Category({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name
    });
    category
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created category successfully",
          createdCategory: {
              name: result.name,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:2000/categories/" + result._id
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
    const id = req.params.categoriesId;
    product.DeletebyIDcate(id)
    Category.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'category deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:2000/categories',
                body: { name: 'String' }
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

  Category.findByIdAndUpdate(req.params.categoryId, {
        $set: req.body
    }, {new: true})
        .then(data => {
            if(!data) {
                return res.status(404).send({
                    success: false,
                    message: "User not found with id " + req.params.categoryId
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
                message: "User not found with id " + req.params.categoryId
            });
        }
        return res.status(500).send({
            success: false,
            message: "Error updating user with id " + req.params.categoryId
        });
    });
  };