const express=require("express");
const app=express();
const users=require('./MOCK_DATA.json')
app.use(express.json());
const fs=require("fs");
app.use(express.urlencoded({extended:true}));

//restAPI
// get method : view data
// app.get("/users",(req,res)=>{
//     res.json(users);
// });

//api user
app.get("/api/users",(req,res)=>{
    res.json(users);
})

app.get("/api/users/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const user=users.find((u)=>u.id===id);
    return res.json(user);
});

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users
                .map(user => `<li>${user.first_name} - ${user.email}</li>`)
                .join("")}
        </ul>
    `;

    res.send(html);
});

app.post("/api/users", (req, res) => {
    const { first_name, email, gender, job_title } = req.body;

    const newUser = {
        id: users.length + 1,
        first_name,
        email,
        gender,
        job_title
    };

    users.push(newUser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error saving user" });
        }

        return res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    });
});

app.patch("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);
    const updates = req.body;

    const userIndex = users.findIndex((u) => u.id == id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    
    Object.assign(users[userIndex],updates);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: "Error updating user" });
        }

        return res.json({
            message: "User updated successfully",
            user: users[userIndex]
        });
    });
});


app.delete("/api/users/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const updates = req.body;

    const userIndex = users.findIndex((u) => u.id == id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const deletedUser=users.splice(userIndex,1);
    
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users,null,2),(err)=>{
        if(err) {
            return res.status(500).json({ message: "Error updating user" });
        }

        res.json({
        message:"user deleted successfully",
        deletedUser:deletedUser[0]
    });
})
});

//same api with same route
app.route("/api/user/:id").get((req,res)=>{

})

const PORT=8000
app.listen(PORT,()=>{
    console.log(`server is running http://localhost:${PORT}`)
});
