const express = require("express");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const router =  express.Router();
const jwt = require("jsonwebtoken");


router.post('/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(hash=>{
    const user = new User({
        email: req.body.email,
        password: hash,
    
    });
    user.save().then(success=>{  
        console.log(success,'success');
        res.status(201).json({
            message:'User Created Successfully'
        })
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
  })


}); 

router.post('/login',(req,res,next)=>{
    let userCredential={}
User.findOne({email: req.body.email}).then(user=>{
  
    if(!user){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
    userCredential.email = user.email;
    userCredential.id = user._id
 return   bcrypt.compare(req.body.password,user.password);
}).then(result=>{
    if(!result){
        return res.status(401).json({
            message:'Auth failed'
        })
    }
    const token = jwt.sign({email:  userCredential.email, userId: userCredential.id},'secret_this_should_be_longer',{expiresIn:"1h" });
    res.status(200).json({
       token: token  
    })
}).catch(err=>{
    console.log(err,'err in the console');
    res.status(401).json({
        error: err
    })
})
})


module.exports = router;