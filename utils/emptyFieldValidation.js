let emptyFieldValidation=async(res,field)=>{
    if(!field){
        return true
        // res.status(400).json({
        //     success:false,
        //     message:"please fill up the field"
        // })
    }

}
module.exports=emptyFieldValidation