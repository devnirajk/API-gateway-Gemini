const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const cors = require('cors');


app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = 8082;

async function generateContent(prompt){
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
}

app.post("/generate", async(req, res) =>{
    const content = await generateContent(req.body.prompt);
    return res.json({
        message: content,
        status: 200
    });
});

app.get("/test", (req, res) => {
    return res.json({
        data: "Hello",
        status: 200
    });
});

app.listen(PORT, () => {
    console.log(`Server is up on PORT: ${PORT}`)
});