var express=require("express");
const router=express.Router();
const employeeModel=require("../model/employeeModel");

// Post route
router.post("/post",async(req,res)=>{
    try{
        var item=req.body;
        var data=new employeeModel(item);
        await data.save();
        res.status(200).send("Data added successfully!!");
// await new studentModel(req.body).save()

    }catch(error){
     res.status(404).send("unable to send data");
    }
});

// get route
router.get("/get",async(req,res)=>{
    try{
        var data=await employeeModel.find();
       
        res.status(200).send(data);
    }catch(error){
        res.status(404).send("unable to send data");
    }
});
router.get("/get/:id",async(req,res)=>{
    try{
      var data= await employeeModel.findById(req.params.id);
        res.status(200).send(data);
    }catch(error){
        res.status(404).send("unable to send data");
    }
    
});


// delete route
router.delete("/remove/:id",async(req,res)=>{
    try{
        await employeeModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Deleted Successfully!!");
    }catch(error){
        res.status(404).send("unable to send data");
    }
    
});

// update(PUT) route
router.put("/edit/:id",async(req,res)=>{
    try{
        await employeeModel.findByIdAndUpdate(req.params.id,req.body);
        res.status(200).send("Updated successfully!!!");
    }catch(error){
res.status(404).send("Unable to send data");
    }
});



module.exports=router;