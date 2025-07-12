const mongoose = require('mongoose');
const URI=process.env.URI 
const connectDb=async()=>{
    try {
        await mongoose.connect(URI)
    } catch (error) {
        console.log("couldn't connect to Database")
    }
}
module.exports=connectDb