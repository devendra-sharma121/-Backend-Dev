const express = require("express");
const app = express();

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application middleware
app.use((req, res, next) => {
    console.log("request url:", req.url);
    console.log("request method:", req.method);
    next();
});

// route middleware
const checkAuth = (req, res, next) => {
    const isLoggedIn = true;

    if (isLoggedIn) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};


// route with middleware
app.get("/home", checkAuth, (req, res) => {
    res.send("welcome to home page");
});

//authentication middleware

const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        return res.status(403).json({message:"token required"});
    }
    if(token!="deva"){
        return res.status(401).json({message:"invalid token"})
    }
    next();
}

app.get("/profile",authMiddleware,(req,res)=>{
    res.json({message:"profile data"});
});

//error handling middleware
app.get("/error",(req,res)=>{
    throw new Error("something went wrong");
});
app.use((err,req,res,next)=>{
    console.log("Error MiddleWare",err.message);
    res.status(500).json({message :" internal server error "});
});

//third party middleware
// CORS=CROSS-ORIGIN-RESOURCE-SHARING


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
});
