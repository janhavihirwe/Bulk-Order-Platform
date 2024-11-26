const express=require("express")
const mongoose=require("mongoose")
const connect=require("./config/db")
const productRoute=require("./routes/products.routes")
const orderRoute=require("./routes/order.routes")
const cors=require("cors")
const { config } = require("dotenv")
require("dotenv").config()

const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use("/product",productRoute)
app.use("/order",orderRoute)

app.get("/",(req,res)=>{
    res.send("Welcome to Bulk Ordering Platform")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connect
        console.log(`Database is connected and listening on ${process.env.PORT}`)
    }
    catch(err){
        console.log(err)
    }
})
