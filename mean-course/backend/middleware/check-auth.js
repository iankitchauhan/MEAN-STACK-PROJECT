const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
try{
    token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, 'secret_this_should_be_longer');
    next();

} catch {
    res.status(404).json({
        message:'Auth failed !'
    })
}

}