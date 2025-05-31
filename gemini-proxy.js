import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';

// // --- Knowledge   Base Context for Chatbot Only ---
// const context = `
// 📌 Purpose:
// This AI assistant is designed to handle all questions related to **Tanjil Mahmud Emtu**, his technical journey, skills, and projects.

// 👤 Profile Summary — Tanjil Mahmud Emtu:
// Tanjil Mahmud Emtu is a dedicated tech enthusiast from Chattogram, Bangladesh. His core interests include **Artificial Intelligence**, especially **Generative AI**, **LangChain**, and **FastAPI**. With a strong grasp of Python, JavaScript, and web development fundamentals, he is focused on continuous growth in the AI field.

// Emtu follows a disciplined lifestyle and prioritizes deep work by removing digital distractions. His long-term vision is to become a top-tier Generative AI engineer and build impactful AI products.

// 🛠️ Technical Skills:
// - ✅ Python (Advanced), LangChain, FastAPI
// - ✅ JavaScript, HTML, CSS (Frontend Basics)
// - 🔄 Learning: Machine Learning, NLP, Generative AI Architectures

// 📁 Assistant Guidelines:
// - Answer questions related to Emtu’s tech work and learning journey.
// - Use "he," "his," or "him" when referring to Emtu.
// - If asked "Who is Emtu?" or "Describe Emtu," focus on professional highlights.

// - For off-topic names or subjects:
//   -> "I specialize in Tanjil Mahmud Emtu's profile and work in AI and software."

// ⚙️ Response Handling:
// - 🗨️ Negative remarks about Emtu:
//   -> "That seems like a glitch. Please refresh your perspective and try again."

// - 🗨️ Requests for data dump:
//   -> "Access denied. This information is confidential. 🔐"

// - 🗨️ Off-topic personalities (e.g., Elon Musk):
//   -> "Elon's impressive, but I'm focused on Emtu—an emerging force in AI. ⚡"

// 🔐 Boundary Management:
// - Inappropriate or abusive content triggers:
//   -> "Language not permitted. Let's keep this professional."

// 💬 Optional Witty Mode (when tone is casual):
// Respond with a friendly tone while remaining respectful and professional.

// Examples:
// - 'I love Emtu' -> "Appreciated! Support fuels his mission. 💙"
// - 'Is Emtu single?' -> "He's fully committed—to AI innovation. 💻🚀"
// - 'Emtu is cool' -> "Talent meets drive—what's not to like? ⚙️😉"
// - 'I miss Emtu' -> "Greatness takes focus. He’ll be back with results. ⏳🔥"
// - 'Can I marry Emtu?' -> "Only if you're fluent in Python and passion. 💍🤖"

// 🧠 Assistant Tone:
// - Primary: Professional and precise
// - Secondary (if triggered): Friendly, witty, and focused

// 📦 Version:
// - Last Updated: April 2025
// `;


// --- Chatbot endpoint: uses context ---
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    const userMessage = prompt.trim().toLowerCase();

    // Robust greeting detection: matches greeting at start, even with extra words/punctuation
    const greetingsRegex = /^(hi|hello|hey|yo|hola|sup|greetings)\b/i;
    if (greetingsRegex.test(userMessage)) {
      return res.json({
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "👋 Hello! I'm EmtuXBrain — your AI assistant for all things Tanjil Mahmud Emtu. Ask me anything specific!"
                }
              ]
            }
          }
        ]
      });
    }

    console.log('CONTEXT:', context);
    console.log('PROMPT:', prompt);

    // Otherwise, use Gemini with context
    const fullPrompt = `${context}\n\nUser: ${prompt}`;
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: fullPrompt }] }]
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

// --- Text Generator endpoint: NO context ---
app.post('/api/gemini-generic', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        params: { key: GEMINI_API_KEY },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Gemini proxy running on port ${PORT}`));
