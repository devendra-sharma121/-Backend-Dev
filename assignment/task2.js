//  Log File Analyzer using Streams 
// Scenario
// A company server generates a huge log file (500MB+). You are asked to analyze it without loading the full file into memory.
// Tasks
// Create a program that:Reads a large log file using streamsCounts:
// Total lines
// Number of ERROR, WARNING, INFO
// Generates a summary report file
//  Constraints
// Must use streams
// No readFile
// Efficient memory usage

const fs = require("fs");
const readline = require("readline");

let totalLines=0;
let Errors=0;
let Warning=0;
let Info=0;

const file=fs.createReadStream("server.log",'utf8');
const rl=readline.createInterface({
    input:file
});

rl.on("line",(line)=>{
    totalLines++;

    if(line.includes("Error")){
        Errors++;
    }
    else if(line.includes("Warning")){
        Warning++;
    }
    else if(line.includes("Info")){
        Info++;
    }
});

rl.on("close",()=>{
    const summary=`log summary
    --------
    Total Lines:${totalLines}
    Errors:${Errors}
    Warning:${Warning}
    Info:${Info}`;

    fs.writeFile("summary.txt",summary,()=>{
        console.log("summary file created");
    });
});
