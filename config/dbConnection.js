const  mongoose  = require('mongoose')

let dbConnection=()=>{
    return mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.25fttev.mongodb.net/${process.env.MONGODB_DBNAME}?appName=Cluster0`).then(()=>{
    console.log("databaged connected")}).catch((err)=>{
        console.log("Databage Connection Error:",err)
    })
}
module.exports=dbConnection