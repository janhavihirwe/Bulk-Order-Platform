const mongoose=require("mongoose")
const OrderSchema=mongoose.Schema({
    buyerName:{type:String,required:true},
    contactInfo:{type:String,required:true},
    deliveryAddress:{type:String,required:true},
    product:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
    quantity:{type:Number,required:true},
    status:{type:String,default:"Pending",enum:["Pending","In Progress","Delivered"]}
},{versionKey:false})
const OrderModel=mongoose.model("Order",OrderSchema)
module.exports=OrderModel