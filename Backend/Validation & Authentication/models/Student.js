const mongoose=require("mongoose");

//Schema with Validation
const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Students must have a name:"],
        minlength:[3,"Name must be at least 3 character"],
        maxlength:[30,"Name must not be excced 30 character"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Students must have a email:"],
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Students must have to enter Password:"],
        minlength:[8,"Password must be 8 character long"]
    },
    age:{
        type:Number,
        min:[18,"Students must be minimum 18 years old:"],
        max:[30,"Students age not excced 30 years old:"]
    },
    dept:{
        type:String,
        enum:{
            values:["CSE","SWE","EEE"],
            message:"Students must be in CSE,SWE or EEE dept:"
        }
    },
    status:{
        type:String,
        default:"Active"
    }
});

//Models creation 
const StudentModel=mongoose.model("Student",StudentSchema);

//Export Models
module.exports=StudentModel;