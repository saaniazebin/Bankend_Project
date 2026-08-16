const emptyFieldValidation=require("../utils/emptyFieldValidation")
const bcrypt=require("bcrypt")
const User=require("../models/userSchema")
const router = require("../routes/authRoutes")
let registrationController=async(req,res)=>{
    const{email,username,password}=req.body
   let pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

   ////////////////////empty field validation//////////////////////////
    if(!email||!username||!password){
    return res.status(400).json({
        sucess:false,
        message:"Please fill this gapss"
    })
   
    }
 ///////////////////////email field validation////////////////////
    if(!pattern.test(email)){
        return res.status(400).json({
            sucess:false,
            message:"please give a valid email id"
        })
    }
 

    ////////////////////existing email/////////////////////////////
    let existingUser=await User.findOne({email:email})
    if(existingUser){
        return res.status(400).json({
            sucess:false,
            message:"email already exists"
        })
    }
    //////////////////////Password validation/////////////////////
    if(!passwordPattern.test(password)){
        return res.status(400).json({
            success:false,
            message:"Please give a password and it have to lower,higher and speacial character                     "
        })
    }
     ///////////////////////userName Validation////////////////////
     if(username.length<3 ||username.length>20){
        return res.status(400).json({
            success:false,
            message:"please give a word between in greater than 3 and less than 20"
        })
     }
      /////////password encrypytion/////////
     const hash = bcrypt.hashSync(password, 10);

     //////////schema Validation///////////////
    let user=new User({
        email:email,
        password:hash,
        username:username
    })
    /////////////save to databage///////////
   user.save()
    return res.status(201).json({
        success:true,
        message:"registration ho giya"
    })
   
}





///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////////////////////////loginController//////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
   
let loginController = async (req, res) => {
    let { email, password } = req.body;

    let existingUser = await User.findOne({ email: email });

    if (!existingUser) {
        return res.status(400).json({
            success: false,
            message: "email not exists"
        });
    }

    let pass = bcrypt.compareSync(password, existingUser.password);
    console.log("pass", pass);
};

module.exports={registrationController,loginController}