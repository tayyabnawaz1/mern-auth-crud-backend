const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(403).json({
            success:false,
            message:"Unauthorizes , jwt token is reuired !"
        })
    }
    try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(403).json({
         success:false,
         message:"Unauthorizes , jwt token wrong or expire !"
        })
    }
}



module.exports=verifyToken;