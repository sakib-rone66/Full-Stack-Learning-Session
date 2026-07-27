const express=require("express");
const router=express.Router();

//Import ./models/Student
const StudentModel=require("../models/Student");

//Import ./controllers/studentController
const{
    postStudent,
    loginStudent,
    getStudents,
    getProfile,
    getStudent,
    putStudent,
    deleteStudent
}=require("../controllers/studentController");

//Import authMiddleware
const authMiddleware=require("../middleware/authMiddleware");

//Router Initialization
router.post("/",postStudent);
router.post("/login",loginStudent);
router.get("/",getStudents);
router.get("/profile",authMiddleware,getProfile);
router.get("/:id",getStudent);
router.put("/:id",putStudent);
router.delete("/:id",deleteStudent);


//Export
module.exports=router;