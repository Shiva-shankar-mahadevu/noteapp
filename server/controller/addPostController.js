const path=require('path')
const {v4:uid}=require('uuid')
const {User,Post}=require('../model/Schema')
const {getUser}=require('../services/userToSession')
const getReq=async(req,res)=>{
    try {
       const posts=await Post.find({})
       const users=await User.find({})
    //    var postQueries=[]
    //    await posts.forEach(async(post)=>{
    //     var postQuery={};
    //     postQuery.content=post.content
    //     postQuery.likes=post.likes
    //     const user=await User.findOne({_id:post.author})
    //     postQuery.author=user.username
    //     postQuery.createdAt=post.createdAt
    //     postQueries.push(postQuery)
    //    })
     //  res.postQueries=postQueries
      // console.log(postQueries)
       res.json({posts,users})
    } catch (error) {
        console.error('server error')
    }
}
const postReq=async(req,res)=>{
    try {
        const {content}=req.body
        const userUid=req.cookies.uid
        const user=await getUser(userUid)
        if(user){
            console.log(content,user.username)
            await Post.create({author:user._id,content})
            console.log('posted')
            res.redirect('/')
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