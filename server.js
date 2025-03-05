const express = require("express");
const data = require("./data.json");
const fs = require("fs"); 
const cors=require("cors");

const app=express();
app.use(cors());
app.use(express.json());
app.get("/data", function (req,res){
    console.log("Sending Data:", data);
    res.json(data);
});

    



app.listen(5500 ,()=>{
    console.log("running");
});