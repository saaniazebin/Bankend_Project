require("dotenv").config();
require("node:dns").setServers(['1.1.1.1','8.8.8.8'])
const express=require('express')
const  mongoose  = require('mongoose')
const app=express()
const dbConnection=require("./config/dbConnection")
const authRouth=require("./routes/authRoutes")
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const { rateLimit, MINUTE } = require('express-rate-limit');
////====================================


// const limiter = rateLimit({
// 	windowMs: 15 * MINUTE, // SECOND, MINUTE, HOUR, and DAY constants are available, or a use bare number for milliseconds
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
// 	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
// 	// store: ... , // Redis, Memcached, etc. See below.
// })

// // Apply the rate limiting middleware to all requests.
// app.use(limiter)




/////===================================


dbConnection()


app.use(express.json())
app.use('/api/v1/auth',authRouth)
//app.get("/",(req,res)=>{
    //res.send('hello this is hasu world')
//})
app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.listen(process.env.PORT || 5000,()=>{
    console.log('server is running')
})