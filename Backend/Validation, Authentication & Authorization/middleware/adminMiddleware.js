const adminMiddleware=((req,res,next)=>{
    //check user's role 
    if(req.user.role!=="admin"){
        res.status(403).json({
            message:"Access Denied.Admin only:"
        });
    }
    //if admin
    next();
});

//Export
module.exports=adminMiddleware;