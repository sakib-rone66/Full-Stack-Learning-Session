const jwt =require("jsonwebtoken");

const authMiddleware=((req,res,next)=>{
    try{
        const authHeaders=req.headers.authorization;
        if(!authHeaders){
            return res.status(401).json({
                message: "Access denied. No token provided."
            })
        }

        //if yes split token
        const token=authHeaders.split(" ")[1];

        //verify token
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user=decoded;
        next();
    }catch(err){
        res.status(500).json({
        message:"Invalid or expired token."
        });
    }
});

//Export
module.exports=authMiddleware;