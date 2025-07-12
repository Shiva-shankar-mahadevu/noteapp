const router = require('express').Router()
const {getReq,postReq}=require('../controller/loginController')
router.route('/')
.get(getReq)
.post(postReq)

module.exports=router