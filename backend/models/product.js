const mongose=require("mongoose")
const ProductSchema=mongose.Schema({
    name:{type:String,required:true},
    imgURL:{type:String,required:true},
    pricePerUnit:{type:Number,required:true}
},{versionKey:false})
const ProductModel=mongose.model("Product",ProductSchema)
module.exports=ProductModel