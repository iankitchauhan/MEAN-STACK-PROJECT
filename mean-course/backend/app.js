const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user")
const path = require("path");
const app = express();
mongoose.connect("mongodb+srv://ankit:sYZyL1o3aX3F0Cyc@cluster0-fudrq.mongodb.net/node-angular?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then((res)=>{
      console.log(res,'Connected to Database');
  }).catch((err)=>{
      console.log(err,'Connection Failed'); 
  })
 
app.use(bodyParser.json());  
app.use("/images",express.static(path.join("backend/images")));
app.use((req,res,next) => {
 
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-requested-with, Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");

next();
})
app.use('/api/posts',postRoutes,(req,res,next) => {
next();
});
app.use('/api/user',userRoutes);

 
module.exports =app;   