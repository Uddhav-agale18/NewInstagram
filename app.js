const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')






mongoose.connect(MONGOURI)


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo !!")
})


mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routs/auth'))
app.use(require('./routs/post'))
app.use(require('./routs/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client2/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client2','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})