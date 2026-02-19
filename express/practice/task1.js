// Task 1: User Management API 
// You are building a User Management System for a company’s internal portal.
// Requirements
// 1. Create an Express server.
// 2. Maintain an in-memory array of users:

// {id, name, email, role}

// 3. Implement the following APIs:
// GET /users → Fetch all users
// GET /users/:id → Fetch user by ID
// POST /users → Add a new user
// PUT /users/:id → Update user details
// DELETE /users/:id → Remove a user
// 4. Add middleware:
// Logger middleware to log request method & URL
// Validation middleware to check required fields while creating a user
// 5. Handle errors properly:
// User not found
// Invalid input
const { userData } =require("./data")
const { logger, validationPost } = require('./middleware');
const express=require('express');
const app=express();
app.use(express.json());

app.get('/users',(req,res)=>{
    return res.json(userData);
});

app.get("/users/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const user= userData.find((u)=>u.id===id);
    if(!user){
        return res.status(404).json({message:"user not found"});
    };
    return res.json(user);
});

app.post("/users",validationPost,(req,res)=>{

    let name=req.body.name;
    let email=req.body.email;
    let role=req.body.role;

    let newUser={
        id:userData.length+1,
        name,
        email,
        role
    }

    userData.push(newUser);
    res.status(201).json({message:"user created",user:newUser});

});

app.put("/user/:id",(req,res)=>{
    const id=parseInt(req,params.id);
    const user=userData.find((u)=>u.id===id);

    if(!user){
        return res.status(404).json({message:"user not found"});
    };

    const name=req.body.name;
    const email=req.body.email;
    const role=req.body.role;

    if(name) user.name=name;
    if(email) user.email=email;
    if(role) user.role=role;

    res.json({
        message:"user updated",
        user
    });
});

app.delete("/users/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const index=userData.findIndex((u)=>u.id===id);

    if(index==-1){
       return res.status(302).json({message:"student not found"});
    }
    
    const deleteUser=userData.splice(index,1);

    res.json({
        message: "Deleted by ID",
        user: deleteUser[0]
    });
});

app.listen(3000, () => {
    console.log(`sever is running http://localhost:${3000}`);
});