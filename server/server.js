require('dotenv').config()
const express = require('express');
const app = express();
const path=require('path')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const homeRouter=require('./router/homeRouter')
const loginRouter=require('./router/loginRouter')
const registerRouter=require('./router/registerRouter')
const detailRouter=require('./router/detailRouter')
const addPostRouter=require('./router/addPostRouter')
const connectDb=require('./db')
const Port=process.env.PORT
const allowLoggedInUserOnly=require('./middleware/checkUserLoggedIn')
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'..','/client')))
app.use('/login',loginRouter)
app.use('/registration',registerRouter)
app.use('/details',detailRouter)
app.use('/addPost',addPostRouter)
app.use('/',allowLoggedInUserOnly,homeRouter)

connectDb().then(()=>{
    app.listen(Port,()=>{
        console.log(`${Port} active`)
    })
})
