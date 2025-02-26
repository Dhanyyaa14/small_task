const express = require("express");
const data = require("./data.json");

const app=express();
app.use(express.json());
app.get('/data', function (req,res){
    res.json(data);
});

    app.post("/data", function(req,res){
            const newentry= req.body;
            if(!newentry.region || !newentry.sales){
                return res.json({
                    message: "required fields of reg and sales"
                });
            }

            data.push(newentry);
            res.json({message: "added " , data : newentry});


    });



app.listen(5500);