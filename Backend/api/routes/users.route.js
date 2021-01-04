

const express = require("express");
const router = express.Router();
const userrouter = require("../controllers/users.controllers");
const User = require('../models/user');

router.get('/',userrouter.findAll);
router.get('/:userId',userrouter.findOne);
router.post('/',userrouter.signup);
router.delete("/:userId",userrouter.remove);
router.post('/login',userrouter.login);
router.put("/:userId",userrouter.update);


module.exports=router;

