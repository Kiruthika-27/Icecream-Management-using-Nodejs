const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

// Define a schema for the form data
const icecreamSchema = new mongoose.Schema({
    icecream_name: String,
    icecream_cost: Number,
    icecream_type: String,
    icecream_quantity: Number
  });
  
  // Create a model based on the schema
  
const Icecream=new mongoose.model('Icecream', icecreamSchema)

module.exports=Icecream