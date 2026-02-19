//third party middleware
// CORS=CROSS-ORIGIN-RESOURCE-SHARING

const express = require("express");
const app = express();
const cors=require("cors");

app.use(cors());

app.get("/data",(req,res)=>{
    res.json({message:"cors working"});
});

const PORT=3000
app.listen(PORT,()=>{
    console.log(`server is running http://localhose:${PORT}`);
});

//Specific Front end allow
//only execute react vibe
app.use(cors({
    origin:"http:localhost:5173"
}));

//multiple front end allow
const allowedOrigins=[
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(cors({
    origin:allowedOrigins,
}));