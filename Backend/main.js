import express from "express"
import { GoogleGenerativeAI } from "@google/generative-ai"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()
const app = express()
const port = 3000
const genAI = new GoogleGenerativeAI(process.env.API_KEY)

  
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

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    console.log("server is listening on port 3000")
})