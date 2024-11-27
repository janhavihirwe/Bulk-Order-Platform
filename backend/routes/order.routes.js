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

Router.get("/",async(req,res)=>{
    try{
        const orders=await Order.find()
        res.json(orders)
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

Router.put("/:id/status",async(req,res)=>{
    try {
        const { status } = req.body; // e.g., "Shipped", "Delivered"
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!order) return res.status(404).send("Order not found");
        res.status(200).json(order);
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports=Router