const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");
//Import ./models/Student.js
const StudentModel=require("../models/Student");

//CRUD
//CREATE or POST
const postStudent=(async(req,res)=>{
    try{
        const hashedPassword=await bcrypt.hash(req.body.password,10);    //Hashed Password
        const student=await StudentModel.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,             //hashedPassword push
            age:req.body.age,
            dept:req.body.dept,
            //if need admin in initial
            role:req.body.role
            
        });
        console.log("CREATE Operation..");
        res.status(201).json({
            message:"Student Created SuccessFully..",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//READ or GET ALL
const getStudents=(async(req,res)=>{
    try{
        const students=await StudentModel.find();
        console.log("READ ALL Operation..");
        if(!students){
            return res.status(404).json({
                message:"Students not Found..!"
            });
        }
        res.status(200).json({
            message:"Students are Here...",
            total:students.length,
            students
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//READ or GET by ID
const getStudent=(async(req,res)=>{
    try{
        const student=await StudentModel.findById(req.params.id);
        console.log("READ by ID Operation..");
        if(!student){
            return res.status(404).json({
                message:"Student not Found..!"
            });
        }
        res.status(200).json({
            message:"Student FOUND...",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//UPDATE or PUT
const putStudent=(async(req,res)=>{
    try{
        //Hashed Updated password
        if(req.body.password){
            req.body.password=await bcrypt.hash(req.body.password,10);
        };

        const student=await StudentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        console.log("Update Operation..");
        if(!student){
            return res.status(404).json({
                message:"Student not Found..!"
            });
        }
        res.status(200).json({
            message:"Student UPDATED...",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//DELETE
const deleteStudent=(async(req,res)=>{
    try{
        const student=await StudentModel.findByIdAndDelete(req.params.id);
        console.log("Delete Operation..");
        if(!student){
            return res.status(404).json({
                message:"Student not Found..!"
            });
        }
        res.status(200).json({
            message:"Student DELETED successfully...",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//Login Authentication
const loginStudent=(async(req,res)=>{
    try{
        //find student by email
        const student=await StudentModel.findOne({
            email:req.body.email
        });
        console.log("Log in Authentication");

        //if not found
        if(!student){
            return res.status(401).json({
                message:"Invalid email address:"
            });
        }
        //if found check password
        const isMatch=await bcrypt.compare(
            req.body.password,
            student.password
        );
        
        //if password not match
        if(!isMatch){
            return res.status(401).json({
                message:"Incorrect Password:"
            });
        }

        //Create Token
        const token=jwt.sign(
            {
                id:student._id,
                email:student.email,
                role:student.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

        //if match log in successfull
        res.status(200).json({
            message:"Login Successfull...",
            token
        });
    }catch(err){
        res.status(500).json({
            message:"Something went Wrong..!",
            error:err.message
        });
    }
});

//getProfile    http://localhost:3000/students/profile
const getProfile=(async(req,res)=>{
    try{
        const student=await StudentModel.findById(req.user.id);
        console.log("GET Profile:http://localhost:3000/students/profile");
        if(!student){
            return res.status(404).json({
                message:"Profile not Found..!"
            });
        }
        res.status(200).json({
            message:"Profile Found..",
            student
        });
    }catch(err){
        res.status(500).json({
            message:"Something went wrong..!",
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
