const router = require('express').Router()
const {getReq,postReq, getNameReq, putLikeReq}=require('../controller/detailController')
router.route('/')
.get(getReq)
.post(postReq)

router.route('/:name')
.get(getNameReq)
.post()

router.route('/likes')
.put(putLikeReq)
module.exports=router