const fs = require("fs");

const command = process.argv[2];
const file1 = process.argv[3];
const file2 = process.argv[4];
const content = process.argv.slice(4).join(" ");

function handleError(err) {
  if (err.code === "ENOENT") {
    console.log("File ya directory nahi mili");
  } else if (err.code === "EACCES") {
    console.log("Permission denied");
  } else {
    console.log("Error:", err.message);
  }
}

// READ
if (command === "read") {
  fs.readFile(file1, "utf8", (err, data) => {
    if (err) return handleError(err);
    console.log("File content:\n", data);
  });
}

// WRITE
else if (command === "write") {
    const content="hello world";
  fs.writeFile(file1, content, (err) => {
    if (err) return handleError(err);
    console.log("File written successfully");
  });
}

// APPEND
else if (command === "append") {
  fs.appendFile(file1, content, (err) => {
    if (err) return handleError(err);
    console.log("File append successfully");
  });
}

// COPY
else if (command === "copy") {
  fs.copyFile(file1, file2, (err) => {
    if (err) return handleError(err);
    console.log("File copied successfully");
  });
}

// DELETE
else if (command === "delete") {
  fs.unlink(file1, (err) => {
    if (err) return handleError(err);
    console.log("File deleted successfully");
  });
}

// LIST DIRECTORY
else if (command === "list") {
  fs.readdir(file1, (err, files) => {
    if (err) return handleError(err);
    console.log("Files in directory:");
    files.forEach(file => console.log(file));
  });
}

// INVALID COMMAND
else {
  console.log("Invalid command");
}
