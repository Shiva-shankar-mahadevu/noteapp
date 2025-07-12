const {getUser}=require('../services/userToSession')
const allowLoggedInUserOnly=async(req,res,next)=>{
    try {
        const userUid=req.cookies.uid
        if(!userUid)
            res.redirect('../login')
        const user=getUser(userUid)
        if(!user)
            res.redirect('../login')
            next()
    } catch (error) {
     console.log('server error')   
    }
}
module.exports=allowLoggedInUserOnly