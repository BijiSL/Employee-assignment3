// Task1: initiate app and run server at 3000
var express=require("express");
var morgan=require("morgan");
require("dotenv").config();
const employeeRoute=require('employeeRoute');
var app=express();
app.use(morgan("dev"));
app.use(express.json());
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
app.use('/api',employeeRoute);
app.listen(process.env.port,()=>{
    console.log(`Listening to port ${process.env.port}`)
})
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));




//  Task2: create mongoDB connection 

const mongoose=require("mongoose");
const employeeModel = require("./model/employeeModel");
mongoose
.connect(process.env.mongo_url)
.then(() => {
    console.log("MongoDB Atlas is connected Successfully!!!");
})
.catch((err) => {
    console.log(err);
})

const employeeSchema=mongoose.Schema({
    employeeName:String,
    employeeLocation:String,
    employeeSalary:Number,
    employeePosition:String
    
});


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist',async(req,res)=>{
    try{
        var data=await employeeModel.find();
       
        res.status(200).send(data);
    }catch(error){
        res.status(404).send("unable to send data");
    }
});



//TODO: get single data from db  using api '/api/employeelist/:id'



app.get('/api/employeelist/:id',async(req,res)=>{
    try{
      var data= await employeeModel.findById(req.params.id);
        res.status(200).send(data);
    }catch(error){
        res.status(404).send("unable to send data");
    }
    
});


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}




app.post('/api/employeelist',async(req,res)=>{
    try{
        var item=req.body;
        var data=new employeeModel(item);
        await data.save();
        data=JSON.stringify(await employeeModel.find(),null,2);
        res.status(200).send(`Data added successfully!!\n${data}`);

    }catch(error){
     res.status(404).send("unable to send data");
    }
});
// const employeeModel=mongoose.model('employee',employeeSchema);

//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        await employeeModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully!!");
    }catch(error){
        res.status(404).send("unable to send data");
    }
    
});



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async(req,res)=>{
    try{
        await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send("Updated successfully!!!");
    }catch(error){
res.status(404).send("Unable to send data");
    }
});



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



