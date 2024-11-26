const express=require("express")
const Product=require("../models/product")
const Router=express.Router()

Router.get("/",async(req,res)=>{
    try{
        const product=await Product.find()
        res.json(product)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})

Router.post("/add-product",async(req,res)=>{
    try{
        const newProduct=new Product(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
 
Router.delete("/delete/:id",async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.json({message:"Product deleted"})
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})
module.exports=Router