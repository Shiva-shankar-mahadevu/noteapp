const path=require('path')
const {User}=require('../model/Schema')
const getReq=async(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','../client/registration.html'))
}
const postReq=async(req,res)=>{
    try {
        const {username,email,password,DOB}=req.body
        const user=await User.findOne({email})
        if(user){
            console.log('Email Already Exists')
            res.redirect('../login')
        }
        else{
           const created= await User.create({username,email,password,DOB})
            console.log('Registered')
            res.json({ success: true });
           
        }
    } catch (error) {
        console.log('sorry')
    }
}
module.exports={getReq,postReq}