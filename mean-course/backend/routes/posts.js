const express = require("express");
const Post = require('../models/post');
const multer= require("multer");
const checkAuth = require("../middleware/check-auth");
const router =  express.Router();

const MIME_TYPE_MAP = {
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage( {
    destination:(req,file,cb) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");

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
    const pageSize = +req.query.pageSize; 
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if(pageSize && currentPage){
        postQuery.skip(pageSize*(currentPage - 1)).limit(pageSize);
    }
    postQuery.then(document=>{
        fetchedPosts =document;
        return  Post.count();
    }).then( count=>{
          return  res.status(200).json({
        message:'Posts fetched successfully',
        post:fetchedPosts,
        maxPosts: count  
      })
    }).catch((res)=>{
        console.log(res) 
    });
});
  router.get('/:id',(req,res,next) => {
      Post.findById(req.params.id).then(post=>{ 
          console.log(post,'posted data');
         res.status(200).json(post) 
      }).catch((res)=>{ 
          console.log(res)
      })
     
    });
  router.post('',checkAuth,multer({storage:storage}).single("image"),(req,res,next) => {
      const url = req.protocol + '://' + req.get("host");
      const post = new Post({ 
          title:req.body.title,
          content:req.body.content,
          imagePath:url +"/images/"  +req.file.filename
      });
      post.save().then(createPost=>{ 
        res.status(201).json({ 
            message:'Posts Created successfully',
          post:{
              ...createPost,
              id:createPost._id 
          }
          })

      });
    
  })
  router.put('/:id',checkAuth,multer({storage:storage}).single("image"),(req,res,next) => {  
      console.log(req.file,'file we get');
      let imagePath = req.body.imagePath
      if(req.file){
        const url = req.protocol + '://' + req.get("host");
        imagePath = url +"/images/"  +req.file.filename

      }
      const post = new Post({ 
          _id: req.body.id,
          title:req.body.title,
          content:req.body.content ,
          imagePath:imagePath
      });
   
      Post.updateOne({_id: req.params.id},post).then((result)=>{
          res.status(200).json({
              message:'Posts updated successfully'    
            
            })
      }).catch(err=> console.log(err,'err on put')); 
     
  })
  router.delete('/:id',checkAuth,(req,res,next) => {
      Post.deleteOne({_id: req.params.id}).then((result)=>{
          console.log(result,'resultrd data');
      })
    console.log(req,'requested dara   ssss');
      res.status(201).json({
          message:'Posts deleted successfully'
        
        })
  })

  module.exports = router;