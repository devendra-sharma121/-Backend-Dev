const express = require("express");
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Deva", marks: 55, city: "Jaipur" },
    { id: 2, name: "jivesh", marks: 80, city: "Hodal" },
    { id: 3, name: "lokesh", marks: 70, city: "palwal" }
];

app.get("/student", (req, res) => {
    res.json(students);
});

// Delete by ID
app.delete("/student/id/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    const deleteStudent = students.splice(index, 1);

    res.json({
        message: "Deleted by ID",
        deleteStudent: deleteStudent[0]
    });
});

//Delete by marks (<60)
app.delete("/student/marks/:marks", (req, res) => {

    const marks = parseInt(req.params.marks);

    const index = students.findIndex((s) => s.marks === marks);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    if (marks >= 60) {
        return res.status(400).json({ message: "Marks not below 60" });
    }

    const deleteStudent = students.splice(index, 1);

    res.json({
        message: "Deleted by marks",
        deleteStudent: deleteStudent[0]
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
