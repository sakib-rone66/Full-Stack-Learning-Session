const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//Import ./models/Student
const StudentModel=require("../models/Student");

//CRUD
//POST or CREATE
const postStudent=(async (req, res)=>{
    try{
        const hashedPass=await bcrypt.hash(req.body.password,10);
        const student=await StudentModel.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass,        //Hashed Password push
            age:req.body.age,
            dept:req.body.dept
        });
        res.status(201).json({
            message:"Student created successfully..",
            student 
        });
    }catch(err){
        res.status(500).json({
            message:"Something wend wrong.>!",
            error:err.message
        });
    }
});

//GET ALL or READ ALL
const getStudents=(async(req,res)=>{
    try{
        const students=await StudentModel.find();
        if(!students){
            return res.status(404).json({
                message:"Students Not Found"
            });
        }
        res.status(200).json({
            message:"Students are Here...",
            total:students.length,
            students
        });
    }catch(err){
        // return a proper error response
        res.status(500).json({
            message:"Something went wrong..!",
            error:err.message
        });
    }
});

//GET by ID
const getStudent=(async(req,res)=>{
    try{
        const student=await StudentModel.findById(req.params.id);
        if(!student){
            return res.status(404).json({
                message:"Students Not Found"
            });
        }
        res.status(200).json({
            message:"Student FOUND..",
            student
        });
    }catch(err){
        // return a proper error response
        res.status(500).json({
            message:"Something went wrong..!",
            error:err.message
        });
    }
});

//UPDATE or POST
const putStudent=(async(req,res)=>{
    try{
        if (req.body.password){
            req.body.password=await bcrypt.hash(req.body.password,10);
        }
        const student=await StudentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!student){
            return res.status(404).json({
                message:"Students Not Found"
            });
        }
        res.status(200).json({
            message:"Student UPDATED..",
            student
        });
    }catch(err){
        // return a proper error response
        res.status(500).json({
            message:"Something went wrong..!",
            error:err.message
        });
    }
});

//DELETE
const deleteStudent=(async(req,res)=>{
    try{
        const student=await StudentModel.findByIdAndDelete(req.params.id);
        if(!student){
            return res.status(404).json({
                message:"Students Not Found"
            });
        }
        res.status(200).json({
            message:"Student DELETED..",
            student
        });
    }catch(err){
        // return a proper error response
        res.status(500).json({
            message:"Something went wrong..!",
            error:err.message
        });
    }
})

//Login Authentication
const loginStudent=(async(req,res)=>{
    try{
        //find by user input email
        const student=await StudentModel.findOne({
            email:req.body.email
        });

        //if not found
        if(!student){
            return res.status(401).json({
                message:"Invalid email..!"
            })
        }

        //bcrypt compare for password
        const isMatch=await bcrypt.compare(
            req.body.password,
            student.password
        );

        //pass not match
        if(!isMatch){
            return res.status(401).json({
                message:"Wrong Password...!"
            });
        }

        //Create Token
        const token=jwt.sign(
            {
            id:student._id,
            email:student.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

        //Login Success
        res.status(200).json({
            message:"Login Successfull...",
            token
        });
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err.message
        });
    }
});

//getProfile
const getProfile=(async(req,res)=>{
    try{
        const student=await StudentModel.findById(req.user.id);

        if(!student){
            return res.status(404).json({
                message:"Profile not found..!"
            })
        }
        res.status(200).json({
            message:"Here is the Profile",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went wrong",
            error:err.message
        });
    }
});


//Export
module.exports={
    postStudent,
    loginStudent,
    getStudents,
    getProfile,
    getStudent,
    putStudent,
    deleteStudent
};
