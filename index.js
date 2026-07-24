require("node:dns").setServers(['1.1.1.1','8.8.8.8'])
require("dotenv").config();
const express=require('express')
const  mongoose  = require('mongoose')
const app=express()
const dbConnection=require("./config/dbConnection")
dbConnection()


app.use(express.json())
app.get("/",(req,res)=>{
    res.send('hello this is hasu world')
})
app.listen(process.env.PORT || 5000,()=>{
    console.log('server is running')
})