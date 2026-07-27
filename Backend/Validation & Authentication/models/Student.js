const mongoose=require("mongoose");

//Schema with Validation
const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Student must have a name"],
        minlength:[3,"Student Name must be atleast 3 character."],
        maxlength:[30,"Name should not excced 30 character"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Student must have a email"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Student must Entered Password"],
        minlength:[8,"Password should atleast 8 character long"]
    },
    age:{
        type:Number,
        min:[18,"Student age must be 18 years old"],
        max:[30,"Student age should not excced over 30 years old "]
    },
    dept:{
        type:String,
        enum:{
            values:["CSE","SWE","EEE"],
            message:"Dept must be CSE, SWE, EEE"
        }
    },
    status:{
        type:String,
        default:"Active"
    }
});

//Models
const StudentModel=mongoose.model("Student",StudentSchema);

//Exports
module.exports=StudentModel;