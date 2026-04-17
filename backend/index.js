import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import OpenAI from "openai"

dotenv.config()

const app = express()
const apiKey = process.env.API_KEY

// Enable CORS
app.use(cors())

// Enable JSON parsing
app.use(express.json())

// Initialize OpenRouter client (OpenAI-compatible)
const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: "https://openrouter.ai/api/v1",
})

app.get("/",(req,res)=>{
    res.send("✅ Server is ready | Backend running on port 5000")
})

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" })
        }

        if (!apiKey) {
            return res.status(500).json({ error: "API key not configured" })
        }

        // Call OpenRouter API (OpenAI-compatible endpoint)
        const response = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
            max_tokens: 1000
        })

        const reply = response.choices[0].message.content
        res.json({ reply })
    } catch (error) {
        console.error("API Error:", error)
        res.status(500).json({ error: error.message || "Server error" })
    }
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`serve at http://localhost:${port}`)
})