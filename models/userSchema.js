const mongoose=require("mongoose")
const {Schema}=mongoose
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String
    },
    // otp:{
    //     type:String,
    //     required:true,
    //     unique:true
    // },
    // isLogin:{
    //     type:Boolean,
    //     default:false
    // },
    role:{
        type:String,
        enum:["student","teacher","management"],
        default:"student"
    },
    permission:{
        type:[String],
    },
    
    password:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("User",userSchema)