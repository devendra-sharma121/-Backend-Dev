const express=require("express");
const app=express();
app.use(express.json());

let students=[
    {id:1,name:"devendra",marks:60,city:"Hyderabad"},
    {id:2,name:"jivesh",marks:70,city:"mathura"}
];
//view student
app.get("/student",(req,res)=>{
    res.json(students);
})

// patch
app.patch("/student/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const update=req.body;
    const student=students.find((S)=>S.id===id);
    if(!student) return res.status(404).send("<h1>Student Not Found</h1>");

    //apply partial updates
    Object.assign(student,update);
    res.json({message:"student updated successfully",student});
});


const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server running successfully http://localhost:${PORT}`);
});

