const express =require('express');
const app=express();

app.use((req,res,next)=>{
    console.log("MiddleWare 1");
    next();
});

app.use((req,res,next)=>{
    console.log("middleWare 2");
    next();
});

app.get("/",(req,res)=>{
    res.send("route executed");
});

const PORT=8000;
app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`);
});
