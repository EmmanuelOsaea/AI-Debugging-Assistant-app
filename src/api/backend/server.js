import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/api/analyze", async (req, res) => {
  try {
    const { prompt, model, max_tokens } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await openai.chat.completions.create({
      model: model || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert debugging assistant. Analyze code or websites clearly, identify issues, and provide actionable fixes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: max_tokens || 700,
      temperature: 0.3,
    });

    const result = response.choices[0]?.message?.content || "";

    res.json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to analyze input" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
