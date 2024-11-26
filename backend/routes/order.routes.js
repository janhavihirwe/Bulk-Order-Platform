const express=require("express")
const Order=require("../models/order")
const Router=express.Router()

Router.post("/",async(req,res)=>{
    try{
        const newOrder=new Order(req.body)
        await newOrder.save()
        res.status(201).json(newOrder)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

Router.get("/:id",async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id).populate("product")
        res.json(order)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

Router.put("/:id",async(req,res)=>{
    try{
        const updatedOrder=await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(updatedOrder)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports=Router