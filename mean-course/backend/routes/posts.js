const express = require("express");
const Post = require('../models/post');
const multer= require("multer");
const router =  express.Router();

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage( {
    destination:(req,file,cb) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Inavlid mime type");

        if(isValid){
            error = null;
        }
        cb(error,"backend/images")
    },
    filename:(req,file,cb) =>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,name + '-'+ Date.now() + '.' + ext);
    }
});

router.get('',(req,res,next) => {
    Post.find().then(document=>{
      return  res.status(200).json({
          message:'Posts fetched successfully',
          post:document 
        })
    }).catch((res)=>{
        console.log(res)
    })
   
  });
  router.get('/:id',(req,res,next) => {
      Post.findById(req.params.id).then(post=>{ 
          console.log(post,'posted data');
         res.status(200).json(post) 
      }).catch((res)=>{ 
          console.log(res)
      })
     
    });
  router.post('',multer({storage:storage}).single("image"),(req,res,next) => {
      const post = new Post({ 
          title:req.body.title,
          content:req.body.content  
      });
      post.save();
      res.status(201).json({
          message:'Posts Created successfully'
        
        })
  })
  router.put('/:id',(req,res,next) => {
      console.log(req,'ettetetetettetete');
  
      const post = new Post({ 
          _id: req.body.id,
          title:req.body.title,
          content:req.body.content 
      });
   
      Post.updateOne({_id: req.params.id},post).then((result)=>{
          console.log(result,'sucesssssssssss');
          res.status(200).json({
              message:'Posts updated successfully'    
            
            })
      }).catch(err=> console.log(err,'err on put')); 
     
  })
  router.delete('/:id',(req,res,next) => {
      Post.deleteOne({_id: req.params.id}).then((result)=>{
          console.log(result,'resultrd data');
      })
    console.log(req,'requested dara   ssss');
      res.status(201).json({
          message:'Posts deleted successfully'
        
        })
  })

  module.exports = router;