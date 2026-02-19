const express=require("express");
const app= express();

//server files from the "public" directory 

//absoluete path:
//relative path: public

//const staticPath=__dirname + "/public"
//const filePath=path.join(__dirname,"piublic","index.html")

app.use(express.static("public"));

app.listen(3000,()=>{
    console.log(`server is running http://localhost:${3000}`);
});
