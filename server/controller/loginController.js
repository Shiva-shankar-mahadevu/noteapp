const path=require('path')
const {v4:uid}=require('uuid')
const {User}=require('../model/Schema')
const {setUser}=require('../services/userToSession')
const getReq=async(req,res)=>{
    try {
        res.status(200).sendFile(path.join(__dirname,'..','../client/login.html'))
    } catch (error) {
        console.error('server error')
    }
}
const postReq=async(req,res)=>{
    try {
        const {email,password}=req.body
        console.log(email,password)
        const user=await User.findOne({email,password})
        if(user){
            console.log(user)
             const sessionId=uid()
                res.cookie('uid',sessionId)
                setUser(sessionId,user)
                res.cookie('user',JSON.stringify(user))
                console.log('liril',res.user)
            res.redirect('../')
        }
        else{
            console.log('No account found')
            res.redirect('../registration')
        }
        
       
    } catch (error) {
        console.error('error while logging in')
        res.json({message:'error while logging in'})
    }
}
module.exports={getReq,postReq}