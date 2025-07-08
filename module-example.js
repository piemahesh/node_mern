import express from "express";

const app = express();


app.get("/",(req,res)=>{
    res.json({message:"he salkjflkasdjfkl;sad"})
})

app.listen(4000)