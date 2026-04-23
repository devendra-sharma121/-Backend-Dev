const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose
    .connect("mongodb://localhost:27017/todoDB")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Mongo Error", err));


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        dueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema);

// Create task
app.post("/api/tasks", async (req, res) => {
    const task = await Task.create(req.body);
    res.json(task);
});


app.get("/api/tasks", async (req, res) => {
    const { status, sort } = req.query;
    const tasks = await Task.find(status && { status })
        .sort(sort === "dueDate" ? { dueDate: 1 } : sort === "-dueDate" ? { dueDate: -1 } : {});
    res.json(tasks);
});


app.get("/api/tasks/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task || { message: "Task not found" });
});


app.put("/api/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task ? { message: "updated", task } : { message: "not found" });
});


app.delete("/api/tasks/:id", async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task ? { message: "deleted", task } : { message: "not found" });
});

app.listen(8000, () => {
    console.log("Server Started on port 8000");
});