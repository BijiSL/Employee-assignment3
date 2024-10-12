const mongoose=require("mongoose");

// create schema
const employeeSchema=mongoose.Schema({
    employeeName:String,
    employeeLocation:String,
    employeeSalary:Number,
    employeePosition:String
    
});
const employeeModel=mongoose.model('employee',employeeSchema);
module.exports=employeeModel;