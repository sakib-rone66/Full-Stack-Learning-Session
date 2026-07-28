const jwt=require("jsonwebtoken");

const authMiddleware=((req,res,next)=>{
    try{
        //get authHeader
        const authHeader=req.headers.authorization;
        //no token in authHeaders
        if(!authHeader){
            return res.status(401).json({
                message:"Access denied. No token provided."
            });
        }
        //if Found split token
        const token=authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Access denied. Invalid authorization header."
            });
        }
        //verify token
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({
            message:"Invalid or expired token."
        });
    }
});

//Export
module.exports=authMiddleware;
