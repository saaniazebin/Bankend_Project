const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')
const User=require("../models/userSchema");
const e = require('express');

////////////////nodemailer///////////
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, 
  auth: {
    user: 'saaniazebin@gmail.com',
    pass: 'zigsqvszageffava',
  },
});
////////////////////////////////////////////


router.post("/sendotp",async(req,res)=>{
    const{email}=req.body 
    if(!email){
        return res.status(400).json({
            success:false,
            message:'Email is required'
        })
        
    }
    let existingUser=await User.findOne({email:email})
     let otp=otpGenerator.generate(6,);
    if(existingUser){
         
    let user=new User({
        email:email,otp:otp
    }).save()
       

    }else{
        //send email
        await User.findOneAndUpdate({email:email},{otp:otp})
    }
         const info = await transporter.sendMail({
  from: '"Fullstack" <saaniazebin@gmail.com>',
  to: email,
  subject: "This is your OTP",
  html: `<!doctype html>
  <html lang="en">
  <meta charset="UTF-8">
  <meta content="width=device-width,initial-scale=1" name="viewport">
  <title>OTP Verification</title>
  <body style="margin:0;padding:0;background-color:#f4f4f4;font-family:Arial,Helvetica,sans-serif">
    <table border="0" cellpadding="0" cellspacing="0" style="width:100%;background-color:#f4f4f4;margin:0;padding:40px 0" width="100%">
      <tr><td align="center">
        <table border="0" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background-color:#fff;border-radius:10px" width="600">
          <tr><td align="center" style="padding:35px 20px 20px 20px">
            <p style="margin:0;font-size:24px;font-weight:700;color:#2563eb">My Website</p>
          </td></tr>
          <tr><td align="center" style="padding:10px 30px 10px 30px">
            <h1 style="margin:0;font-size:26px;line-height:34px;color:#222;font-weight:700">Verify Your Email</h1>
          </td></tr>
          <tr><td align="center" style="padding:10px 40px 25px 40px">
            <p style="margin:0;font-size:15px;line-height:24px;color:#666">Please use the verification code below to complete your verification.</p>
          </td></tr>
          <tr><td align="center" style="padding:10px 20px 30px 20px">
            <table border="0" cellpadding="0" cellspacing="0" style="background-color:#f1f5ff;border:1px solid #dbe4ff;border-radius:8px">
              <tr><td align="center" style="padding:18px 35px;font-size:32px;line-height:40px;font-weight:700;letter-spacing:8px;color:#2563eb">${otp}</td></tr>
            </table>
          </td></tr>
          <tr><td align="center" style="padding:0 30px 25px 30px">
            <p style="margin:0;font-size:13px;line-height:20px;color:#777">This verification code will expire in <strong style="color:#333">10 minutes</strong>.</p>
          </td></tr>
          <tr><td align="center" style="border-top:1px solid #eee;padding:25px 35px 30px 35px">
            <p style="margin:0;font-size:12px;line-height:19px;color:#999">If you didn't request this code, you can safely ignore this email.</p>
          </td></tr>
          <tr><td align="center" style="background-color:#f8f8f8;padding:18px 20px;border-radius:0 0 10px 10px">
            <p style="margin:0;font-size:12px;color:#999">© 2026 My Website. All rights reserved.</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  `,
});

console.log("Message sent: %s", info.messageId);
    
   res.send("done")

   

res.status(200).json({
    success: true,
    message: "OTP sent successfully"
})

})
router.post('/login/:email',async(req,res)=>{
  const {otp}=req.body
  const {email}=req.params
       let existingUser=await User.findOne({email:email})
       console.log(existingUser.otp)
       if(!existingUser.isLogin){
        return res.send("First logout")
       }

       if(!existingUser.otp){
        return res.send("chor")
       }
       if(existingUser.otp==otp){
         await User.findOneAndUpdate({email:email},{otp:"",isLogin:true})
    
        res.send("login")
       }else{
        res.send("otp not matched")
       }
})
router.post("/logout",async(req,res)=>{
  const {email}=res.body
   let existingUser=await User.findOne({email:email}) 
   if(existingUser.isLogin){
    //userUpdate
     await User.findOneAndUpdate({email:email},{otp:"",isLogin:false})
   }
})
module.exports = router;