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

//Import adminMiddleware
const adminMiddleware=require("../middleware/adminMiddleware");

//Router initialization

//Only admin can create a student: FULL SECURE
router.post("/",authMiddleware,adminMiddleware,postStudent);

router.post("/login",loginStudent);
router.get("/",authMiddleware,getStudents);

//Logged-in user can view own profile: MIDDLE SECURE
router.get("/profile",authMiddleware,getProfile);
router.get("/:id",authMiddleware,getStudent);

router.put("/:id",authMiddleware,adminMiddleware,putStudent);

//Only admin can delete a student: FULL SECURE
router.delete("/:id",authMiddleware,adminMiddleware,deleteStudent);

//Export
module.exports=router;
