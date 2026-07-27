require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();


//Json Middleware
app.use(express.json());

//Middleware
app.use((req,res,next)=>{
    console.log("Middleware is Running...!");
    next();
});

//Import ./routes/students.js
const studentsRouter=require("./routes/students");
app.use("/students",studentsRouter);

//MongoDB
mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("MongoDB Connected...");
}).catch((err)=>{
    console.log("MongoDB Connection FAILED..!");
});

//Server
app.listen(process.env.PORT,()=>{
    console.log("\n");
    console.log(`Server Running in PORT: ${process.env.PORT}`);

});