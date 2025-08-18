require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENAI_URL = 'https:///openrouter.ai/api/v1/chat/completions';

app.post('/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('[server] Received messages from frontend:', messages);
  const payload = {
    model: 'openai/gpt-3.5-turbo',
    messages,
  };
  console.log('[server] Sending payload to OpenRouter:', payload);
  try {
    const response = await axios.post(
      OPENAI_URL,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('[server] Received response from OpenRouter:', response.data);
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('[server] Error from OpenRouter:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
