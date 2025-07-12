const path=require('path')
const {User,Post}=require('../model/Schema')
const {getUser}=require('../services/userToSession')
const getReq=async(req,res)=>{
try {
    const num=req.params.num
    const user=getUser(req.cookies.uid)
    res.json({user})
} catch (error) {
    console.log('error')
}
}
const postReq=async(req,res)=>{
   
}
const getNameReq=async(req,res)=>{
    try {
        const username=req.params.name
        const reqName=getUser(req.cookies.uid).username
        const user=await User.findOne({username})
        res.json({username:username,src:user.src,noOfPostsLiked:user.noOfPostsLiked})
    } catch (error) {
        
    }
}
const putLikeReq=async(req,res)=>{
    try {
        const {_id}=req.body
        const post=await Post.findOne({_id})
        let likedBy=post.likedBy
        if(!likedBy.includes(getUser(req.cookies.uid)._id)){
            console.log(likedBy)
            likedBy.push(getUser(req.cookies.uid)._id)
            console.log(likedBy)
            const updatedPost = await Post.findByIdAndUpdate(_id, {likedBy });
            const user=await User.findOne({_id:getUser(req.cookies.uid)._id})
            const likes=user.noOfPostsLiked+1
            const updatedUser=await User.findByIdAndUpdate(getUser(req.cookies.uid)._id,{noOfPostsLiked:likes})
            res.json({ success: true });  
        }
        else{
            console.log(likedBy)
            likedBy=likedBy.filter((likes)=>{
                return likes!==getUser(req.cookies.uid)._id
            })
            console.log(likedBy)
            res.redirect('/')
        }
    } 
        
 catch (error) {
        console.log('error')
    }
}
module.exports={getReq,postReq,getNameReq,putLikeReq}