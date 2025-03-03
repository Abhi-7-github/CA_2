const express=require("express")
require("dotenv").config()
const cors =require("cors")
const User=require("./schema")
const { json } = require("body-parser")
const { default: mongoose } = require("mongoose")

const app=express()
app.use(express.json())
app.use(cors())

const port=process.env.PORT 

app.get("/item",async(req,res)=>{
    res.status(200).json({message:"Running"})
    console.log("App is running")
})

app.post("/item",async(req,res)=>{


    try {

        const {name,location,cuisine,rating,menu}=req.body

        const newuser=new User({name,location,cuisine,rating,menu})

        if(!name || !location || !cuisine || !rating || !menu){
            res.status(404).json({message:"Feilds required"})
        }
        
        await newuser.save()
        res.status(201).json({message:"Data Is Saved",newuser})
        
    } catch (error) {
        console.log(error)
    }

})

 const db=async()=>{
     try {
      await mongoose.connect(process.env.mongodb)
        console.log("Connected")
    } catch (error) {
        console.log(error)
        }
}
db();

app.put("/item/:id",async(req,res)=>{
    const updated= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    try {
        if(!updated){
            res.status(400).json({message:"Item is not Updated"})
        }
         res.status(200).json({message:"Item is Updated",updated})
    } catch (error) {
        console.log(error)
    }
})
    
app.delete("/item/:id",async(req,res)=>{
    const deleted= await User.findByIdAndDelete(req.params.id,req.body,{new:true})
    try {
        if(!deleted){
            res.status(400).json({message:"Item is not Deleted"})
        }
         res.status(200).json({message:"Item is Deleted"})
    } catch (error) {
        console.log(error)
    }

})
    
app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`)
})