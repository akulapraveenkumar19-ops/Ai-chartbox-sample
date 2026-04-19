import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import OpenAI from "openai"

dotenv.config()

const app = express()
// Get OpenRouter API key from .env (get free key at openrouter.ai)
// Uses mock fallback if no key - no 500 errors!
const apiKey = process.env.API_KEY || null;

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
  console.log("📨 Incoming chat:", req.body);
  
  const { message } = req.body
  
  if (!message) {
    return res.status(400).json({ error: "Message is required" })
  }

  // Smart fallback responses
  const getFallbackReply = (msg) => {
    const responses = [
      `Thanks for asking about "${msg}". This is a demo response from Fulstrack AI! 🚀`,
      "Great question! Here's my best answer: You're on the right track! 👍",
      "AI thinking... The key is practice and consistency. What do you think?",
      `For "${msg}", check out the docs or try searching OpenRouter for more.`,
      "Perfect! My response: Success comes from solving problems step by step. 💪"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  let reply = getFallbackReply(message);
  
  if (apiKey) {
    try {
      const response = await openai.chat.completions.create({
        model: "google/gemini-2.0-flash-exp:free",
        messages: [{ role: "user", content: message }],
        max_tokens: 500
      });
      reply = response.choices[0]?.message?.content?.trim() || reply;
      console.log("🤖 AI reply success");
    } catch (error) {
      console.error("❌ OpenRouter error:", error.message);
      // Keep fallback
    }
  } else {
    console.log("🔑 Using fallback (no API_KEY in .env)");
  }
  
  console.log("✅ Reply sent:", reply.substring(0, 50) + "...");
  res.json({ reply });
})

const port = process.env.PORT || 5000

app.listen(port,()=>{
console.log(`✅ Server running at http://localhost:${port}`)
})