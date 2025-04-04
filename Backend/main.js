import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import cors from "cors"
import mongoose from "mongoose";
import { createRecentModel } from "./models/recent.js";
import dotenv from "dotenv"
import bodyParser from "body-parser";
const app = express()
const port = 3000

app.use(bodyParser.json());

dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.API_KEY)

  
let con = await mongoose.connect("mongodb://localhost:27017/gemini-clone")

app.use(cors())

app.post("/:prompt",async (req,res)=>{
    const model = genAI.getGenerativeModel({model:"gemini-1.5-flash"})
    const prompt = req.params.prompt;
  
    const result = await model.generateContent(prompt)
    // console.log(result.response.text())
    const response = result.response
    const data = {text:response.text()}
    res.json(data)
})

app.post("/getSubject/:promptSubject",async(req,res)=>{
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = req.params.promptSubject;
    const subjectPrompt = `Extract a short subject line (4-5 words) based on the user's prompt, and avoid using any special characters (e.g., ?, !, /, etc.):\n\n"${prompt}"`;
    const subjectResult = await model.generateContent(subjectPrompt);
    const subjectLine = subjectResult.response.text();

    res.json({ subject: subjectLine });
})

app.post("/savechat/save",(req,res)=>{
    // let recentJson = req.params.chatArray;
    let { chatArray, colName } = req.body;
    colName = colName.trim("\n")
    // console.log("I ran")
    // console.log(chatArray,colName)
    const Recent = createRecentModel(colName);
    chatArray.map((data)=>{
        let RECENT = new Recent(data);
        RECENT.save()
    })
    
    // console.log(recentJson)
    res.json("i ran");

})


app.get("/getCol/:colname",async (req,res)=>{
    const colname = req.params.colname
    const collection = con.connection.db.collection(colname);
    const documents = await collection.find({}).toArray();
    // console.log(documents)
    res.json(documents);
})

app.get("/receive/collections",async(req,res)=>{
    const collections = await con.connection.db.listCollections().toArray();

        // Extract collection names
        const collectionNames = collections.map(collection => collection.name);

        // Send collection names as response
        res.json(collectionNames);
})

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log("server is listening on port 3000")
})