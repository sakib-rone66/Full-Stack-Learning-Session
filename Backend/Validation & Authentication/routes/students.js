const express=require("express");
const router=express.Router();

//Import ./models/Student.js
const StudentModel=require("../models/Student");


//Import ./controllers/studentsController.js
const{
    postStudent,
    loginStudent,
    getStudents,
    getProfile,
    getStudent,
    putStudent,
    deleteStudent
}=require("../controllers/studentsController");

//Import authMiddleware
const authMiddleware=require("../middleware/authMiddleware");

//Router initialization
router.post("/",postStudent);
router.post("/login",loginStudent);
router.get("/",getStudents);
router.get("/profile",authMiddleware,getProfile);
router.get("/:id",getStudent);
router.put("/:id",putStudent);
router.delete("/:id",deleteStudent);

//Export
module.exports=router;
