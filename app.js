import express from 'express';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: prompt,
    });

    res.json({ success: true, response: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to communicate with AI model' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
