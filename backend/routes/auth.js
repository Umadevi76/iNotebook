const express= require('express');
const User = require('../models/User');
const router= express.Router();
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
 
const JWT_SECRET = 'Harryisagoodb$oy';
// ROUTE 1:api/auth/createuser

router.post('/createuser',[
 body('name','Enter a valid name').isLength({min:3}),
 body('email','Enter a valid email').isEmail(),
 body('password').isLength({min:5})
],
async (req,res)=>{
  let success=false;
  //If there are errors, return Bad request and the errors
 const errors= validationResult(req);
 if(!errors.isEmpty()){
  return res.status(400).json({success, errors: errors.array()});
 }

 try{
  //Check whether the user with this email exists already
 let user = await User.findOne({email: req.body.email});
 if(user){
   return res.status(400).json({success, error: "Sorry a user with this email already exists"})
 }
 const salt= await bcrypt.genSalt(10);
 const secPass = await bcrypt.hash(req.body.password, salt);
 user = await User.create({
  name: req.body.name,
  password: secPass,
  email: req.body.email,
 })
//  .then(User=>res.json(User))
//  .catch(err=> {console.log(err)
// res.json({error: 'Please enter a unique value for email',message: err.message})})
const data ={
  user:{
    id: user.id
  }
}

const authToken= jwt.sign(data, JWT_SECRET);
success= true;
res.json({success,authToken})

//  res.json(User)
} catch (error){
  console.log(error.message);
  res.status(500).send("Some Error occured");
}
})

// ROUTE 2:Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login',[
  body('email','Enter a valid email').isEmail(),
  body('password',"Password cannot be blank").exists(),
 ],
 async (req,res)=>{
   //If there are errors, return Bad request and the errors
  const errors= validationResult(req);
 let success=false;
  if(!errors.isEmpty()){
   return res.status(400).json({errors: errors.array()});
  }

  const {email,password}=req.body;
  try{
    let user= await User.findOne({email});
    if(!user){
      success=false;
      return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
      return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    const data ={
      user:{
        id: user.id
      }
    }
    const authToken= jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,authToken})
  }
  catch (error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }


})
//ROUTE 3:
router.post('/getuser',fetchuser, async (req,res)=>{
  
try{
  userId = req.user.id;
  const user =await User.findById(userId).select("-password")
  res.send(user)
} catch (error){
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports= router