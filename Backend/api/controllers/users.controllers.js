const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user');
const { json } = require("body-parser");
const JWT_KEY ="secret";

exports.findAll = (req,res, next)=>{
     User.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            _id:doc._id,
            fName:doc.fName,
            lName:doc.lName,
            email:doc.email,
            gender:doc.gender,
            birthday:doc.birthday,
            phone:doc.phone,
            isAdmin:doc.isAdmin,
            iscConfirm : doc.iscConfirm,
            isLock: doc.isLock,
            request: {
              type: "GET",
              url: "http://localhost:2000/users/" + doc._id
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


exports.findOne =(req,res,next) => {
    const id = req.params.userId;
   User.findById(id)
     .exec()
     .then(doc => {
       console.log("From database", doc);
       if (doc) {
         res.status(200).json({
          _id:doc._id,
          fName:doc.fName,
          lName:doc.lName,
          email:doc.email,
          gender:doc.gender,
          birthday:doc.birthday,
          phone:doc.phone,
          isAdmin:doc.isAdmin,
          iscConfirm : doc.iscConfirm,
          isLock: doc.isLock,
             request: {
                 type: 'GET',
                 url: 'http://localhost:2000/users'
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
    const id = req.params.userId;
        User.remove({ _id: id })
          .exec()
          .then(result => {
            res.status(200).json({
                message: 'user deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:2000/users',
                    body: { lName: 'String', email: 'String' }
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
  


exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 10).then(
    (hash) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash,
        fName: req.body.fName,
        lName:req.body.lName,
        email: req.body.email,
        password: hash,
        gender: req.body.gender,
        birthday: req.body.birthday,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        isLock:req.body.isLock,
        iscConfirm:req.body.iscConfirm,
    });
    user.save().then(
        result=> {
        res.status(201).json({
            message: 'User added successfully!',
            createdUser: {
                _id: result._id,
                email: result.email,
                fName:result.fName,
                lName:result.lName,
                email: result.email,
                gender: result.gender,
                birthday: result.birthday,
                phone: result.phone,
                isAdmin: result.isAdmin,
                isLock:result.isLock,
                iscConfirm:result.iscConfirm,}
        });
        }
    ).catch(
        (error) => {
        res.status(500).json({
            error: error
        });
        }
    );
    }
);
};

exports.update = (req, res, next) => {

    User.findByIdAndUpdate(req.params.userId, {
          $set: req.body
      }, {new: true})
          .then(data => {
              if(!data) {
                  return res.status(404).send({
                      success: false,
                      message: "User not found with id " + req.params.userId
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
                  message: "User not found with id " + req.params.userId
              });
          }
          return res.status(500).send({
              success: false,
              message: "Error updating user with id " + req.params.userId
          });
      });
    };




exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if(user.length < 1){
          return res.status(200).json({
            message: 'auth failed',
            code:401
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
          console.log(req.body)
          if(err){
            return res.status(200).json({
              message: 'auth failed',
              code:401
            });
          }
          if (result){

            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id,
              isAdmin: user[0].isAdmin,
              isLock: user[0].isLock
            },JWT_KEY,{
              expiresIn: "1h"
            }
            );
               return res.status(200).json({
              message: 'auth successful',
              token: token,
              isAdmin :user[0].isAdmin,
              email: user[0].email,
              isLock: user[0].isLock,
              code:200
            });
          }else{
          res.status(200).json({
            message: 'auth failed',
            code:401
          });}
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
};