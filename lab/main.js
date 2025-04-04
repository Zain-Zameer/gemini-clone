import fs from "fs"

fs.readFile("./isi.txt","utf8",(err,data)=>{
  console.log(data)
})