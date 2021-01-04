const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const categoryroutes = require("../controllers/categories.controllers");

router.get("/",categoryroutes.findAll)
router.put("/:categoryId",categoryroutes.update );
// router.get("/", (req, res, next) => {
//     Category.find()
//       //.select("name price _id")
//       .exec()
//       .then(docs => {
//         const response = {
//           count: docs.length,
//           category: docs.map(doc => {
//             return {
//               name: doc.name,
//               _id: doc._id,
//               request: {
//                 type: "GET",
//                 url: "http://localhost:2000/categories/" + doc._id
//               }
//             };
//           })
//         };
//         //   if (docs.length >= 0) {
//         res.status(200).json(response);
//         //   } else {
//         //       res.status(404).json({
//         //           message: 'No entries found'
//         //       });
//         //   }
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
//   });
router.get("/:categoriesId", categoryroutes.findOne);
router.post('/', categoryroutes.create);
router.delete("/:categoriesId", categoryroutes.delete)

  // router.post("/", (req, res, next) => {
  //   const category = new Category({
  //     _id: new mongoose.Types.ObjectId(),
  //     name: req.body.name
  //   });
  //   category
  //     .save()
  //     .then(result => {
  //       console.log(result);
  //       res.status(201).json({
  //         message: "Created category successfully",
  //         createdCategory: {
  //             name: result.name,
  //             _id: result._id,
  //             request: {
  //                 type: 'GET',
  //                 url: "http://localhost:2000/categories/" + result._id
  //             }
  //         }
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       res.status(500).json({
  //         error: err
  //       });
  //     });
  // });
  
  module.exports = router;