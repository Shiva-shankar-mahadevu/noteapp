const router = require('express').Router()
const {getReq,postReq}=require('../controller/registerController')
router.route('/')
.get(getReq)
.post(postReq)

module.exports=router