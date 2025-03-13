const express = require("express");
const data = require("./data.json");
const fs = require("fs"); 
const cors=require("cors");

const app=express();

app.use(cors({ origin: "*" }));  // Allow all origins
app.use(express.json());


app.get("/data", function (req,res){
    console.log("Sending Data:", data);
    res.json(data);
});


app.listen(5500, function(){
    console.log("Server is running on port 5500");
});


app.post("/data", function(req,res){
    console.log("Received Data:", req.body);
    res.json({message: "Data received"});
});

