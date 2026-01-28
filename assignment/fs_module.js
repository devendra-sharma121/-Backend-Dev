// Task 1: File Manager CLI Tool
// Scenario
// You are working as a backend intern. Your manager asks you to build a command-line File Manager that can perform basic file operations.
// Tasks
// Create a Node.js program that supports the following commands:
// Read a file
// Write content to a file
// Append logs to a file
// Copy a file
// Delete a file
// List files inside a directory
//  Constraints
// Use asynchronous fs methods
// Handle errors properly (ENOENT, EACCES)
// Use process.argv for input

const fs=require('fs');

const write=fs.writeFile("user.txt","hello world",err=>{
    if (err) {
        console.log("error",err);
        return;
    }
    console.log("file written successfully");
});
console.log(write);

// read file 
const read=fs.readFile("user.txt",'utf8',err=>{
    if (err) {
        console.log("error",err);
        return;
    }
    console.log("file read successfully");
});
console.log(read);
//append file
const append=fs.appendFile("user.txt","\n Node.js is a backend framework",(err)=>{
    if (err) {
        console.log("file is not append",err);
        return;
    }
    console.log("file append successfully");
});
console.log(append);

// List files inside a directory
const dire=fs.mkdir("dev",{ recursive:true},err=>{
    if (err){
        console.log("already exist",err);
        return;
    }
    
    fs.writeFile("dev/file1.txt","radhe radhe",err=>{
        if(err) {
            console.log("file not write successfully",err);
            return;
        }
        console.log("file written successfully inside directory");
    })
});
console.log(dire);

// delete
const del = fs.unlink("user.txt",err=>{
    if(err){
        console.log("file not delete");
        return;
    }
    console.log("file deleted successfully");
});
console.log(del);
