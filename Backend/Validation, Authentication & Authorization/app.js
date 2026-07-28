require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();

//json Middleware
app.use(express.json());

//Middleware
app.use((req,res,next)=>{
    console.log("Middleware is Running....");
    next();
});

//Import ./routes/students.js
const studentsRouter=require("./routes/students");
app.use("/students",studentsRouter);

//MongoDB
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("MongoDB is Connected Successfully..");
    console.log("\n");
}).catch((err)=>{
    console.log("MongoDB is not Connected..!");
});

//Server Creation
app.listen(process.env.PORT,()=>{
    console.log("\n");
    console.log(`Server is Running at PORT:${process.env.PORT}`);
})