const  mongoose  = require('mongoose')

let dbConnection=()=>{
    return mongoose.connect("mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.25fttev.mongodb.net/${process.env.MONGODB_DBNAME}?appName=Cluster0").then(() => {
    console.log("MongoDB connected successfully")
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
});
}
module.exports=dbConnection