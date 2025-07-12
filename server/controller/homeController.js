const path=require('path')

const getReq=async(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'..','../client/home.html'))
}
const postReq=async(req,res)=>{

}
module.exports={getReq,postReq}